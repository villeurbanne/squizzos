<script lang="ts">
   import type { PageData } from "./$types";
   import { User } from "sveltepocket";
   import Icon from "@iconify/svelte";

   import UserInfo from "$lib/components/cards/userInfo.svelte";
   import AddFood from "$lib/components/cards/addFood.svelte";
   import ExpiredSoon from "$lib/components/cards/expiredSoon.svelte";

   export let data: PageData;
</script>

<User let:user>
   <div class="flex flex-row gap-2 m-5 place-items-center">
      <Icon icon="heroicons:squares-2x2" class="size-9" />
      <h1 class="text-3xl">Dashboard</h1>
   </div>

   <div class="grid w-full h-full grid-rows-10">
      <div class="grid grid-cols-3 row-span-2">
         <!-- user card -->
         <div class="col-span-2 p-4">
            <UserInfo />
         </div>

         <!-- create food card -->
         <div class="col-span-1 p-4 -ml-4">
            <AddFood />
         </div>
      </div>

      <!-- soon to be expired card -->
      <div class="p-4 -mt-4 row-span-8">
         <ExpiredSoon />
      </div>
   </div>
</User>
