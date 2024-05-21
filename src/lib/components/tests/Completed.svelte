<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import PocketBase from "pocketbase";
    import Icon from "@iconify/svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    export let completed: any;
    export let width: number;

    const pb = new PocketBase("https://squizzos.pockethost.io");
    let test: any = null;

    onMount(async () => {
        test = await pb.collection("tests").getOne(completed.test);
    });

    async function restartTest() {
        goto("/exam/" + completed.test);
    }
</script>

<Card.Root class="w-[{width}%] bg-opacity-20">
    {#if test}
        <Card.Header class="flex items-center">
            <Card.Title class="text-xl italic">
                {test.title}
            </Card.Title>
        </Card.Header>
        <Card.Content class="flex flex-col items-center justify-center">
            <p class="text-lg text-center text-gray-400">
                {test.description}
            </p>
            <p>
                Score: {completed.score}/{test.questions.length}
            </p>
        </Card.Content>
        <Card.Footer class="flex items-center justify-center">
            <Button
                class="flex items-center justify-center gap-2 bg-opacity-30 hover:bg-opacity-85"
                variant="outline"
                on:click={restartTest}
            >
                <Icon icon="mdi:restart" class="size-5" />
                <span class="text-lg text-center">Retake</span>
            </Button>
        </Card.Footer>
    {/if}
    {#if !test}
        <Card.Header class="flex items-center justify-center">
            <Card.Title class="text-xl">Loading...</Card.Title>
        </Card.Header>
    {/if}
</Card.Root>
