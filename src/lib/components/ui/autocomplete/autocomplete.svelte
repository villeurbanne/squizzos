<script lang="ts">
   import Check from "lucide-svelte/icons/check";
   import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
   import * as Command from "$lib/components/ui/command/index.js";
   import * as Popover from "$lib/components/ui/popover/index.js";
   import { Button } from "$lib/components/ui/button/index.js";
   import { cn } from "$lib/utils.js";
   import { tick } from "svelte";

   let open = false;

   export let objects : any[] = [];
   export let name : string = "object";
   export let input : string;
   export let ingredient : string = "";

   $: selectedValue =
       objects.find((f) => f.name === ingredient)?.name ?? 
      `Select an ${name}`;

   // We want to refocus the trigger button when the user selects
   // an item from the list so users can continue navigating the
   // rest of the form with the keyboard.
   function closeAndFocusTrigger(triggerId: string) {
      open = false;
      tick().then(() => {
         document.getElementById(triggerId)?.focus();
      });
   }
</script>

<Popover.Root bind:open let:ids>
   <Popover.Trigger asChild let:builder>
      <Button
         builders={[builder]}
         variant="outline"
         role="combobox"
         aria-expanded={open}
         class="justify-between col-span-3 bg-opacity-30"
      >
         {selectedValue}
         <ChevronsUpDown class="w-4 h-4 ml-2 opacity-50 shrink-0" />
      </Button>
   </Popover.Trigger>
   <Popover.Content class="col-span-3 p-0 mt-4">
      <Command.Root>
         <Command.Input placeholder={`Search ${name}...`} bind:value={input} />
         <Command.Empty>No {name} found.</Command.Empty>
         <Command.Group>
            {#each objects as object}
               <Command.Item
                  value={object.name}
                  onSelect={(currentValue) => {
                     ingredient = currentValue;
                     closeAndFocusTrigger(ids.trigger);
                  }}
               >
                  <Check
                     class={cn(
                        "mr-2 h-4 w-4",
                        ingredient !== object.name && "text-transparent",
                     )}
                  />
                  {object.name}
               </Command.Item>
            {/each}
         </Command.Group>
      </Command.Root>
   </Popover.Content>
</Popover.Root>
