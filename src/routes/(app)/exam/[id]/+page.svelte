<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import PocketBase from "pocketbase";
    import Question from "$lib/components/questions/Question.svelte";
    import { goto } from "$app/navigation";
    const pb = new PocketBase("https://squizzos.pockethost.io");

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

    function handleAnswer(event: any) {
        if (
            event.detail.answer === test.questions[currentQuestionIndex].correct
        )
            score++;
        currentQuestionIndex++;
        if (currentQuestionIndex === test.questions.length) finished = true;
    }
</script>

<div class="p-10">
    {#if !test}
        <div>Loading...</div>
    {/if}
    {#if test && !finished}
        <div class="text-white text-4xl">{test.title}</div>
        <Question
            question={test.questions[currentQuestionIndex]}
            on:submit={handleAnswer}
        />
    {/if}
    {#if finished}
        <div class="text-white text-4xl">Test completed</div>
        <div class="text-white text-2xl">
            Score: {score}/{maxScore}
        </div>
    {/if}
</div>
