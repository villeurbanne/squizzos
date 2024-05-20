<script lang="ts">
   import * as Card from "$lib/components/ui/card";
   import { Collection } from "sveltepocket";

   import Ingredient from "$lib/components/ingredients/Ingredient.svelte";
   import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
   import RecipeSkeleton from "$lib/components/recipies/RecipeSkeleton.svelte";

   const array = Array(3)
      .fill(0)
      .map((_, i) => i);

   let date = new Date();
   date.setDate(date.getDate() + 3);

   let formattedDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2);

   const options = {
      filter: `expiration != null && expiration <= '${formattedDate}'`,
   };
</script>

<Card.Root class="h-[69dvh] m-6 -mt-6 bg-transparent border-gray-600">
   <Card.Content class="flex flex-col justify-center">
      <Collection collection={"ingredient"} {options} let:data let:count>
         <p class="p-2 mt-2 text-lg text-right">
            Found {count} ingredient(s) that are
            <span class="text-red-500">about to expire</span>
            !
         </p>
         <div slot="loading">
            <p class="p-2 mt-2 mb-5 text-lg">Loading...</p>
            <ScrollArea class="h-[67dvh] w-full mt-3">
               <div class="flex flex-row flex-wrap gap-5 mb-4">
                  {#each array as num}
                     <RecipeSkeleton />
                  {/each}
               </div>
            </ScrollArea>
         </div>

         {#if count < 1}
            <ScrollArea class="h-[67dvh] w-full mt-1">
               <div class="">
                  <p class="text-lg">No ingredients about to expire :)</p>
               </div>
            </ScrollArea>
         {:else}
            <ScrollArea class="h-[67dvh] w-full mt-1">
               <div class="flex flex-row flex-wrap gap-5 mb-8">
                  {#each data as food}
                     <Ingredient {food} width={30} imageWidth={310} />
                  {/each}
               </div>
            </ScrollArea>
         {/if}
      </Collection>
   </Card.Content>
</Card.Root>
