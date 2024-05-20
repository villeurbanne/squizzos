<script lang="ts">
   import Icon from "@iconify/svelte";
   import { getCollection } from "sveltepocket";
   import Recipe from "$lib/components/recipies/Recipe.svelte";
   import { env } from "$env/dynamic/public";
   import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
   import RecipeSkeleton from "$lib/components/recipies/RecipeSkeleton.svelte";

   let loading = true;
   let recipes: any[] = [];
   let savedRecipes: any[] = [];
   let ingredients: string[] = [];

   const records = getCollection("ingredient", {});
   const bookmarks = getCollection("recipe", {});

   function checkSaved(recipe: any) {
      for (const saved of savedRecipes) {
         if (saved.label == recipe.label) return true;
      }
      return false;
   }

   function getRecipesByIngredients(ingredients: string[]) {
      const recipe_name = ingredients.join(" ");

      fetch(
         `https://api.edamam.com/search?q=${recipe_name}&app_id=${env.PUBLIC_RECIPES_APP_ID}&app_key=${env.PUBLIC_RECIPES_APP_KEY}`,
      )
         .then((response) => response.json())
         .then((data) => {
            recipes = data.hits;
            loading = false;
         })
         .catch((error) => {
            console.error(error);
            loading = false;
            recipes = [];
         });
   }

   async function parsePantry(
      recordsPromise: Promise<any[]>,
      bookmarksPromise: Promise<any[]>,
   ): Promise<any[]> {
      const records = await recordsPromise;
      const bookmarks = await bookmarksPromise;

      for (const record of records) ingredients.push(record.name);
      for (const bookmark of bookmarks) savedRecipes.push(bookmark);
      return [ingredients, savedRecipes];
   }

   parsePantry(records, bookmarks).then((data) => {
      getRecipesByIngredients(data[0]);
   });
</script>

<div class="flex flex-row justify-between p-5">
   <div class="flex flex-row gap-2 place-items-center">
      <Icon icon="ep:food" class="size-9" />
      <h1 class="text-3xl">Suggestions</h1>
   </div>
</div>

<div class="p-10">
   {#if loading}
      <p class="mb-5 text-lg">Loading...</p>
   {:else}
      <p class="mb-5 text-lg">Found {recipes.length} recipe(s)</p>
   {/if}
   <ScrollArea class="h-[75dvh] rounded-md border p-4">
      <div class="flex flex-col gap-5">
         {#if loading || recipes.length === 0}
            {#each [1, 2, 3] as { }}
               <RecipeSkeleton />
            {/each}
         {:else}
            {#each recipes as recipe}
               <Recipe
                  recipe={recipe.recipe}
                  saved={checkSaved(recipe.recipe)}
                  hideSave={checkSaved(recipe.recipe)}
                  {ingredients}
               />
            {/each}
         {/if}
      </div>
   </ScrollArea>
</div>
