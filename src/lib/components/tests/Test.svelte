<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import PocketBase from "pocketbase";

    import Icon from "@iconify/svelte";
    import { goto } from "$app/navigation";
    export let test: any;

    export let width: number;

    async function startTest() {
        goto("/exam/" + test.id);
    }
</script>

<Card.Root class="w-[{width}%] bg-opacity-20">
    <Card.Header class="flex items-center">
        <Card.Title class="text-xl italic">
            {test.title}
        </Card.Title>
    </Card.Header>
    <Card.Content class="flex items-center justify-center -mt-7">
        <p class="text-lg text-center text-gray-400">
            {test.description}
        </p>
    </Card.Content>
    <Card.Footer class="flex items-center justify-center">
        <Button
            class="flex items-center justify-center gap-2 bg-opacity-30 hover:bg-opacity-85"
            variant="outline"
            on:click={startTest}
        >
            <Icon icon="material-symbols:flag" class="size-5" />
            <span class="text-lg text-center">Start</span>
        </Button>
    </Card.Footer>
</Card.Root>
