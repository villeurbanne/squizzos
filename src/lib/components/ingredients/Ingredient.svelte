<script lang="ts">
   import * as Card from "$lib/components/ui/card";
   import { Button } from "$lib/components/ui/button";
   import PocketBase from "pocketbase";
   import { toast } from "svelte-sonner";

   const pb = new PocketBase("https://rupert.pockethost.io");

   import Icon from "@iconify/svelte";
   import { env } from "$env/dynamic/public";
   export let food: any;
   let image: string;

   export let width: number;
   export let imageWidth: number;

   fetch(
      `https://api.edamam.com/api/food-database/v2/parser?ingr=${food.name}&app_id=${env.PUBLIC_FOOD_APP_ID}&app_key=${env.PUBLIC_FOOD_APP_KEY}`,
   )
      .then((response) => response.json())
      .then((data) => {
         image = data.hints[0].food.image;
      })
      .catch((error) => console.error(error));

   function getRemainingDays(date: Date) {
      const expirationDate = new Date(date);
      const today = new Date();
      const diffTime = expirationDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
   }

   async function deleteIngredient() {
      toast.loading("Loading...");
      await pb.collection("ingredient").delete(food.id);
      toast.success("Ingredient deleted successfully");
      location.reload();
   }
</script>

<Card.Root class="w-[{width}%] bg-opacity-20">
   <Card.Header class="flex items-center">
      <img
         src={image}
         alt={food.name}
         width="{imageWidth}px"
         class="rounded-lg"
      />
      <Card.Title class="text-xl italic">
         {food.quantity} x {food.name}
      </Card.Title>
   </Card.Header>
   {#if food.expiration}
      <Card.Content class="flex items-center justify-center -mt-7">
         <p class="text-lg text-center text-gray-400">
            expires in {getRemainingDays(food.expiration)} days
         </p>
      </Card.Content>
   {:else}
      <Card.Content class="flex items-center justify-center -mt-7">
         <p class="m-3 text-lg text-center text-gray-400"></p>
      </Card.Content>
   {/if}
   <Card.Footer class="flex items-center justify-center">
      <Button
         class="flex items-center justify-center gap-2 bg-opacity-30 hover:bg-opacity-85"
         variant="outline"
         on:click={deleteIngredient}
      >
         <Icon icon="lucide:trash-2" class="size-5" />
         <span class="text-lg text-center">Delete</span>
      </Button>
   </Card.Footer>
</Card.Root>
