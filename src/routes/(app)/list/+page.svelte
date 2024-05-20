<script lang="ts">
    import Icon from "@iconify/svelte";
    import { client } from "sveltepocket";
	import { pantry } from '$lib/stores/pantry';

    let missingIngredients: string[] = [];

    let loading = true;
    client
        .collection("pantry")
        .getOne($pantry)
        .then((pantry: any) => {
            missingIngredients = pantry.list;
            loading = false;
        });
</script>

<div class="flex flex-row justify-between p-5">
    <div class="flex flex-row gap-2 place-items-center">
        <Icon icon="lucide:list" class="size-9" />
        <h1 class="text-4xl">List</h1>
    </div>
</div>

<div class="p-10">
    {#if loading}
        <div class="mb-5 text-lg">Loading...</div>
    {/if}
    <div class="flex flex-row flex-wrap gap-5">
        {#if missingIngredients.length < 1 && !loading}
            <h1 class="text-xl font-bold text-grey-500">No missing ingredients</h1>
        {:else}
            {#each missingIngredients as ingredient}
                <div class="p-4 bg-transparent rounded-lg shadow-md backdrop-blur-lg">
                    <h1 class="text-2xl font-bold">{ingredient}</h1>
                </div>
            {/each}
        {/if}
    </div>
</div>
