<script lang="ts">
    import { getCollection } from "sveltepocket";
    import Recipe from "$lib/components/recipies/Recipe.svelte";
    import Icon from "@iconify/svelte";
    import RecipeSkeleton from "$lib/components/recipies/RecipeSkeleton.svelte";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    let saved = true;
    let ingredients: string[] = [];
    let recipes: any[] = [];

    let loading = true;
    getCollection("ingredient", {}).then((records) => {
        for (const ingredient of records) ingredients.push(ingredient.name);
        getCollection("recipe").then((savedRecipes) => {
            for (const recipe of savedRecipes) recipes.push(recipe);
            loading = false;
        });
    });
</script>

<div class="flex flex-row justify-between p-5">
    <div class="flex flex-row gap-2 place-items-center">
        <Icon icon="lucide:bookmark" class="size-9" />
        <h1 class="text-4xl">Saved Recipes</h1>
    </div>
</div>

<div class="p-10">
    {#if loading}
        <ScrollArea class="h-[73dvh] w-full rounded-md border p-4">
            <div class="flex flex-col gap-5">
                {#each [1, 2, 3] as { }}
                    <RecipeSkeleton />
                {/each}
            </div>
        </ScrollArea>
    {:else}
        {#if recipes.length >= 1}
            <p class="mb-5 text-lg">You have {recipes.length} saved recipes</p>
        {:else}
            <p class="mb-5 text-lg">You have no saved recipes</p>
        {/if}
        <ScrollArea class="h-[73dvh] w-full rounded-md border p-4">
            <div class="flex flex-col gap-5">
                {#each recipes as recipe}
                    <Recipe {recipe} {saved} {ingredients} />
                {/each}
            </div>
        </ScrollArea>
    {/if}
</div>
