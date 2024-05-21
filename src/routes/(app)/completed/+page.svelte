<script lang="ts">
    import { Collection } from "sveltepocket";
    import Completed from "$lib/components/tests/Completed.svelte";
    import TestSkeleton from "$lib/components/tests/TestSkeleton.svelte";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

    const array = Array(12)
        .fill(0)
        .map((_, i) => i);
</script>

<div class="p-10">
    <Collection collection={"completed"} let:data let:count>
        <p class="mb-5 text-lg">Found {count} test(s)</p>
        <div slot="loading">
            <p class="mb-5 text-lg">Loading...</p>
            <ScrollArea class="h-[73dvh] w-full rounded-md border p-4">
                <div class="flex flex-row flex-wrap gap-5">
                    {#each array as num}
                        <TestSkeleton width={25} imageWidth={250} />
                    {/each}
                </div>
            </ScrollArea>
        </div>

        {#if count < 1}
            <ScrollArea class="h-[73dvh] w-full rounded-md border p-4">
                <div class="flex flex-row flex-wrap gap-5">
                    {#each array as num}
                        <TestSkeleton width={25} imageWidth={250} />
                    {/each}
                </div>
            </ScrollArea>
        {:else}
            <ScrollArea class="h-[73dvh] w-full rounded-md border p-4">
                <div class="flex flex-row flex-wrap gap-5">
                    {#each data as completed}
                        <Completed completed={completed} width={25} />
                    {/each}
                </div>
            </ScrollArea>
        {/if}
    </Collection>
</div>
