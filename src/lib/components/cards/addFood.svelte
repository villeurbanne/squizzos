<script lang="ts">
   import * as Card from "$lib/components/ui/card";
   import AddFoodDialog from "$lib/components/cards/addFood.dialog.svelte";
</script>

<Card.Root class="flex items-center justify-end h-full mr-16 bg-transparent border-none glass">
   <Card.Header>
      <div class="flex flex-row items-center justify-center gap-5">
         <Card.Title class="text-2xl font-normal">Add ingredient</Card.Title>
         <AddFoodDialog />
      </div>
   </Card.Header>
</Card.Root>
