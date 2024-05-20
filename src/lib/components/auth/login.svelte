<script lang="ts">
   import { goto } from "$app/navigation";
   import { client } from "sveltepocket";
   import { toast } from "svelte-sonner";

   import * as Card from "$lib/components/ui/card";
   import { Button } from "$lib/components/ui/button";
   import { pantry } from "$lib/stores/pantry";

   async function signIn() {

      try {
         // auth the user
         const user = await client
            .collection("users")
            .authWithOAuth2({ provider: "github" });

         goto("/dashboard");
         toast.success("Signed in successfully");

         try {
            // check if the user already has a pantry
            const records = await client.collection("pantry").getFullList({
               filter: `creator.id='${user.record.id}'`,
            });

            // if the user doesn't have a pantry, create one
            if (records.length < 1) {
               const data = {
                  creator: user.record.id,
               };

               // here we cretqte the pantry
               // then we set the pantry store with the id of the pantry

               const record = await client.collection("pantry").create(data);
               pantry.setPantry(record.id);
            } else {
               // if the user already has a pantry, we set the pantry store with the id of the pantry
               pantry.setPantry(records[0].id);
            }
            
         } catch (e) {
            console.error(e);
            toast.error("An error occured while setting up the pantry");
         }

      } catch (e) {
         console.error(e);
         toast.error("An error occured while signing in");
      }
   }
</script>

<Card.Root class="md:w-[30%] w-full text-center">
   <Card.Header>
      <Card.Title>Welcome to Squizzos 🎉</Card.Title>
      <Card.Description
         >Become an expert about the Olympic Games through quizzes !</Card.Description
      >
   </Card.Header>

   <Card.Content class="flex justify-center">
      <img src="image/lezard.png" class="w-[20%] rounded-3xl" alt="" />
   </Card.Content>

   <Card.Footer class="flex justify-center">
      <Button variant="outline" on:click={signIn}>Login with Github</Button>
   </Card.Footer>
</Card.Root>
