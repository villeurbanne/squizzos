<script lang="ts">
   import { Collection } from "sveltepocket";
   import Icon from "@iconify/svelte";
   import Ingredient from "$lib/components/ingredients/Ingredient.svelte";
   import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
   import AddFoodDialog from "$lib/components/cards/addFood.dialog.svelte";
   import IngredientSkeleton from "$lib/components/ingredients/IngredientSkeleton.svelte";

   const array = Array(12)
      .fill(0)
      .map((_, i) => i);
</script>

<div class="flex flex-row justify-between p-5">
   <div class="flex flex-row gap-2 place-items-center">
      <Icon icon="solar:fridge-outline" class="size-9" />
      <h1 class="text-3xl">Pantry</h1>
   </div>
   <AddFoodDialog />
</div>

<div class="p-10">
   <Collection collection={"ingredient"} let:data let:count>
      <p class="mb-5 text-lg">Found {count} ingredient(s)</p>
      <div slot="loading">
         <p class="mb-5 text-lg">Loading...</p>
         <ScrollArea class="h-[73dvh] w-full rounded-md border p-4">
            <div class="flex flex-row flex-wrap gap-5">
               {#each array as num}
                  <IngredientSkeleton width={25} imageWidth={250} />
               {/each}
            </div>
         </ScrollArea>
      </div>

      {#if count < 1}
         <ScrollArea class="h-[73dvh] w-full rounded-md border p-4">
            <div class="flex flex-row flex-wrap gap-5">
               {#each array as num}
                  <IngredientSkeleton width={25} imageWidth={250} />
               {/each}
            </div>
         </ScrollArea>
      {:else}
         <ScrollArea class="h-[73dvh] w-full rounded-md border p-4">
            <div class="flex flex-row flex-wrap gap-5">
               {#each data as food}
                  <Ingredient {food} width={25} imageWidth={250} />
               {/each}
            </div>
         </ScrollArea>
      {/if}
   </Collection>
</div>
