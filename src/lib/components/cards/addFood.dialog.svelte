<script lang="ts">
   import { toast } from "svelte-sonner";
   import { client } from "sveltepocket";
   import { env } from "$env/dynamic/public";
   import { pantry } from "$lib/stores/pantry";
   import { getLocalTimeZone, type DateValue } from "@internationalized/date";

   import Autocomplete from "$lib/components/ui/autocomplete/autocomplete.svelte";
   import DatePicker from "$lib/components/ui/date-picker/datePicker.svelte";
   import { Button } from "$lib/components/ui/button/index.js";
   import * as Dialog from "$lib/components/ui/dialog/index.js";
   import { Input } from "$lib/components/ui/input/index.js";
   import { Label } from "$lib/components/ui/label/index.js";

   let loading = false;

   let ingredient: string = "";
   let quantity: number = 1;
   let date: DateValue | undefined = undefined;
   let dialogOpen = false;

   // logic for food autocomplete

   let objects: any[] = [];
   let input: string = "";
   let previous: string;

   // api call to get food

   async function getFoods() {
      if (input === previous) {
         return;
      }
      previous = input;

      const url = new URL(
         "https://api.spoonacular.com/food/ingredients/autocomplete",
      );
      const params: any = {
         query: input,
         apiKey: env.PUBLIC_SPOONACULAR_API_KEY,
         number: 6,
      };

      Object.keys(params).forEach((key) =>
         url.searchParams.append(key, params[key]),
      );

      const response = await fetch(url);

      if (response.ok) {
         const data = await response.json();
         return data;
      } else {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
   }

   $: {
      if (input && input.length > 2) {
         getFoods().then((data) => {
            if (!data || data.length < 1) return;
            objects = data;
         });
      } else {
         objects = [];
      }
   }

   // logic to create a new ingredient

   async function addIngredient() {
      loading = true;

      if (!ingredient || ingredient.length < 3) {
         loading = false;
         toast.error("Please fill in the ingredient field");
         return;
      }
      toast.loading("Loading...");

      let formatedDate: string = "";
      if (date) {
         let temporary = date.toDate(getLocalTimeZone());
         formatedDate =
            temporary.getFullYear() +
            "-" +
            ("0" + (temporary.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + temporary.getDate()).slice(-2) +
            " " +
            ("0" + temporary.getHours()).slice(-2) +
            ":" +
            ("0" + temporary.getMinutes()).slice(-2) +
            ":" +
            ("0" + temporary.getSeconds()).slice(-2);
      }

      const data = {
         name: ingredient,
         expiration: date ? formatedDate : null,
         pantry: $pantry,
         quantity: quantity,
      };

      try {
         // create the ingredient
         await client.collection("ingredient").create(data);

         // close the dialog
         dialogOpen = false;

         // show a success message
         loading = false;
         toast.success("Ingredient added successfully");
         location.reload();
      } catch (e) {
         loading = false;

         console.error(e);
         toast.error("An error occured while adding the ingredient");
      }
   }
</script>

<Dialog.Root bind:open={dialogOpen}>
   <Dialog.Trigger class="px-4 py-2 text-xl bg-red-500 rounded-lg opacity-80"
      >+</Dialog.Trigger
   >
   <Dialog.Content class="sm:max-w-[425px] bg-opacity-60">
      <Dialog.Header>
         <Dialog.Title>Add an ingredient</Dialog.Title>
         <Dialog.Description>
            Fill in the form below to add an ingredient
         </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
         <div class="grid items-center grid-cols-4 gap-4">
            <Label for="ingredient" class="text-right">Ingredient</Label>
            <Autocomplete
               {objects}
               name={"ingredient"}
               bind:input
               bind:ingredient
            />
         </div>

         <div class="grid items-center grid-cols-4 gap-4">
            <Label for="quantity" class="text-right">Quantity</Label>
            <Input
               id="quantity"
               type="number"
               min="1"
               class="col-span-3 bg-opacity-30"
               bind:value={quantity}
               required
            />
         </div>

         <div class="grid items-center grid-cols-4 gap-4">
            <Label for="expiration" class="text-right">Expiration Date</Label>
            <DatePicker bind:value={date} />
         </div>
      </div>
      <Dialog.Footer>
         <Button type="submit" on:click={addIngredient} disabled={loading}
            >Add Ingredient</Button
         >
      </Dialog.Footer>
   </Dialog.Content>
</Dialog.Root>
