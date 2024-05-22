<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import PocketBase from "pocketbase";
    import Question from "$lib/components/questions/Question.svelte";
    import { Button } from "$lib/components/ui/button";
    import { goto } from "$app/navigation";
    import { toast } from "svelte-sonner";
    import {
        Reddit,
        LinkedIn,
        Telegram,
        Tumblr,
        WhatsApp,
        Facebook,
        X,
    } from "svelte-share-buttons-component";
    import Fire from "$lib/components/fire/Fire.svelte";
    const pb = new PocketBase("https://squizzos.pockethost.io");
    const MAX_TESTS = 50;

    const userRaw: string | null = localStorage.getItem("pocketbase_auth");
    let user: any;
    if (!userRaw) goto("/");
    else user = JSON.parse(userRaw);

    let id: string;
    let currentQuestionIndex = 0;
    let test: any;
    let score = 0;
    let finished = false;
    let maxScore = 0;

    const url = "https://squizzos.netlify.app";
    const title = "I just scored 5/5 on this test! Can you beat me?";

    onMount(async () => {
        id = $page.params.id;
        test = await pb
            .collection("tests")
            .getOne(id, { populate: ["questions"] });
        maxScore = test.questions.length;
    });

    async function findExistingCompleted() {
        let completed = await pb.collection("completed").getList(1, 10, {
            filter:
                'test = "' + test.id + '" && user.id = "' + user.model.id + '"',
        });
        if (completed.items.length > 0) return completed.items[0];
        else return null;
    }

    async function calculateScoreSum() {
        let completed = await pb.collection("completed").getList(1, MAX_TESTS, {
            filter: 'user.id = "' + user.model.id + '"',
        });
        let sum = 0;
        completed.items.forEach((item: any) => {
            sum += item.score;
        });
        return sum;
    }

    async function completeTest() {
        finished = true;
        let data = {
            test: test.id,
            score,
            user: user.model.id,
        };
        console.log(data);
        let existing = await findExistingCompleted();
        let newScore = await calculateScoreSum();
        newScore = newScore + score;

        if (existing) {
            pb.collection("completed").update(existing.id, data);
            pb.collection("users").update(user.model.id, {
                score: newScore,
            });
        } else {
            pb.collection("completed").create(data);
            pb.collection("users").update(user.model.id, {
                score: newScore,
            });
        }
    }

    function handleAnswer(event: any) {
        if (
            event.detail.answer === test.questions[currentQuestionIndex].correct
        ) {
            toast.success("Correct!");
            score++;
        } else {
            toast.error("Incorrect!");
        }
        currentQuestionIndex++;
        if (currentQuestionIndex === test.questions.length) completeTest();
    }
</script>

<div class="p-10">
    {#if !test}
        <div>Loading...</div>
    {/if}
    {#if test && !finished}
        <div class="flex flex-row justify-between p-5">
            <div class="flex flex-row gap-2 place-items-center">
                <h1 class="text-3xl">{test.title}</h1>
            </div>
            <Button on:click={() => goto("/tests")} variant="outline">
                Go back to tests
            </Button>
        </div>
        <div class="text-white text-2xl pb-6 text-center">
            Question {currentQuestionIndex}/{maxScore}
        </div>
        <Question
            question={test.questions[currentQuestionIndex]}
            on:submit={handleAnswer}
        />
        <div class="text-white text-2xl pb-6 text-center mb-10">
            Score: {score} / {maxScore}
        </div>
        <div class="flex flex-row justify-center items-center gap-5 p-20">
            <Fire size={(score + 1) * 10} />
        </div>
    {/if}
    {#if finished}
        <div class="text-white text-4xl">Test completed: {test.title}</div>
        <div class="w-[100%] h-[100%] bg-opacity-20">
            <div class="flex flex-col justify-center items-center p-10 gap-5">
                <div class="text-white text-2xl">
                    Score: {score}/{maxScore}
                </div>
                <div class="text-white text-xl">
                    Share your score with your friends:
                </div>
                <div class="flex gap-2">
                    <Reddit class="share-button" {title} {url} />
                    <LinkedIn class="share-button" {url} />
                    <Tumblr
                        class="share-button"
                        {title}
                        {url}
                        caption={title}
                    />
                    <Telegram class="share-button" text={title} {url} />
                    <WhatsApp class="share-button" text="{title} {url}" />
                    <Facebook class="share-button" quote={title} {url} />
                    <X
                        class="share-button"
                        text={title}
                        {url}
                        hashtags="github,svelte"
                        via="username"
                        related="other,users"
                    />
                </div>
                <div>
                    <Button on:click={() => goto("/tests")} variant="outline">
                        Go back to tests
                    </Button>
                </div>
            </div>
        </div>
    {/if}
</div>
