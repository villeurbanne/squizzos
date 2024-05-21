<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import PocketBase from "pocketbase";
    import Question from "$lib/components/questions/Question.svelte";
    import { Button } from "$lib/components/ui/button";
    import { goto } from "$app/navigation";
    const pb = new PocketBase("https://squizzos.pockethost.io");

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

    onMount(async () => {
        id = $page.params.id;
        test = await pb
            .collection("tests")
            .getOne(id, { populate: ["questions"] });
        maxScore = test.questions.length;
    });

    function completeTest() {
        finished = true;
        let data = {
            test: test.id,
            score,
            user: user.model.id,
        };
        console.log(data);
        pb.collection("completed").create(data);
        pb.collection("users").update(user.model.id, {
            score: user.model.score + score,
        });
    }

    function handleAnswer(event: any) {
        if (
            event.detail.answer === test.questions[currentQuestionIndex].correct
        )
            score++;
        currentQuestionIndex++;
        if (currentQuestionIndex === test.questions.length) completeTest();
    }
</script>

<div class="p-10">
    {#if !test}
        <div>Loading...</div>
    {/if}
    {#if test && !finished}
        <div class="text-white text-4xl pb-6">{test.title}</div>
        <div class="text-white text-2xl pb-6 text-center">
            Question {currentQuestionIndex}/{maxScore}
        </div>
        <Question
            question={test.questions[currentQuestionIndex]}
            on:submit={handleAnswer}
        />
    {/if}
    {#if finished}
        <div class="text-white text-4xl">Test completed</div>
        <div class="w-[100%] h-[100%] bg-opacity-20">
            <div class="flex flex-col justify-center items-center p-10">
                <div class="text-white text-2xl">
                    Score: {score}/{maxScore}
                </div>
                <div>
                    <Button
                        class="bg-white text-black p-2 rounded-md"
                        on:click={() => goto("/tests")}
                        variant="outline"
                    >
                        Go back
                    </Button>
                </div>
            </div>
        </div>
    {/if}
</div>
