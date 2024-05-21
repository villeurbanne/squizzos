<script lang="ts">
   import { Skeleton } from "$lib/components/ui/skeleton";
   import * as Card from "$lib/components/ui/card/";

   export let width: number;
   export let imageWidth: number;
</script>

<Card.Root class="w-[{width}%] bg-opacity-20">
   <Card.Header class="flex flex-col items-center justify-center gap-4 mb-2">
      <Skeleton class="h-[20px] w-[100px] rounded-full bg-black bg-opacity-40" />
   </Card.Header>
   <Card.Content class="flex items-center justify-center -mt-6">
      <Skeleton class="h-[17px] w-[120px] rounded-full bg-black bg-opacity-40" />
   </Card.Content>
   <Card.Footer class="flex items-center justify-center -mt-2">
      <Skeleton class="h-[40px] w-[100px] rounded-lg bg-black bg-opacity-40" />
   </Card.Footer>
</Card.Root>
