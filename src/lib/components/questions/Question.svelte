<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import * as Select from "$lib/components/ui/select";
    import { createEventDispatcher } from "svelte";
    import Icon from "@iconify/svelte";

    export let question: any;
    let answer: any;
    const dispatch = createEventDispatcher();

    function handleSelectedChange(event: any) {
        answer = event.value;
        console.log(answer);
    }
    function submitAnswer() {
        console.log(answer);
        dispatch("submit", { answer });
    }
</script>

<Card.Root class="w-[100%] h-[100%] bg-opacity-20">
    <Card.Header class="flex items-center">
        <Card.Title class="text-2xl italic pb-5">
            {question.title}
        </Card.Title>
    </Card.Header>
    <Card.Content class="flex items-center justify-center -mt-7">
        {#if question.answers}
            <Select.Root
                selected={question.answers[0]}
                onSelectedChange={(e) => {
                    e && handleSelectedChange(e);
                }}
            >
                <Select.Trigger class="w-[180px]">
                    <Select.Value placeholder="Answer" />
                </Select.Trigger>
                <Select.Content>
                    {#each question.answers as answer}
                        <Select.Item value={answer}>{answer}</Select.Item>
                    {/each}
                </Select.Content>
            </Select.Root>
        {/if}
    </Card.Content>
    <Card.Footer class="flex items-center justify-center">
        <Button
            class="flex items-center justify-center gap-2 bg-opacity-30 hover:bg-opacity-85"
            variant="outline"
            on:click={submitAnswer}
        >
            <Icon icon="formkit:submit" class="size-5" />
            <span class="text-lg text-center">Submit</span>
        </Button>
    </Card.Footer>
</Card.Root>
