<script lang="ts">
   import * as Card from "$lib/components/ui/card";
   import { userStore } from "sveltepocket";

   // user profile picture

   const user = userStore();
   const avatar =
      "https://api.dicebear.com/7.x/pixel-art/svg?seed=" + $user?.username;
</script>

<Card.Root class="w-full h-full bg-transparent border-none">
   <Card.Content class="flex items-center justify-start h-full gap-4 mt-2">
      <p class="text-2xl">
         Welcome
         <span class="italic text-red-500"> {$user?.username} </span>
         !
      </p>
      <img src={avatar} alt="User pfp" class="rounded-full w-[8%]" />
   </Card.Content>
</Card.Root>
