<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import Icon from "@iconify/svelte";
    import { toast } from "svelte-sonner";
    import { client } from "sveltepocket";
    import { pantry } from "$lib/stores/pantry";

    export let recipe: any;
    export let saved: boolean;
    export let hideSave: boolean = false;
    export let ingredients: string[] = [];

    let missingIngredients: string[] = [];

    function checkifInPantry(ingredient: string) {
        console.log(ingredient);
        console.log(ingredients);
        for (const pantryIngredient of ingredients) {
            if (
                pantryIngredient == ingredient ||
                ingredient.includes(pantryIngredient)
            )
                return true;
        }
        missingIngredients.push(ingredient);
        return false;
    }

    async function addMissingIngredientsToList() {
        console.log(missingIngredients);
        let pantryId = localStorage.getItem("rupertPantryId");

        toast.loading("Adding missing ingredients to list...");
        client
            .collection("pantry")
            .update(pantryId, { list: missingIngredients })
            .then(() => {
                toast.success("Ingredients added to list successfully");
            });
    }

    async function saveRecipe() {
        toast.loading("Saving recipe...");
        const data = {
            label: recipe.label,
            image: recipe.image,
            ingredients: recipe.ingredients,
            url: recipe.url,
            content: "",
            user: client.authStore.model.id,
        };

        try {
            await client.collection("recipe").create(data);

            toast.success("Recipe save successfully");
            location.reload();
        } catch (e) {
            toast.error("An error occured while saving the recipe");
        }
    }

    async function unsaveRecipe() {
        toast.loading("Unsaving recipe...");
        try {
            await client.collection("recipe").delete(recipe.id);
            toast.success("Recipe unsaved successfully");
            location.reload();
        } catch (e) {
            toast.error("An error occured while unsaving the recipe");
        }
    }
</script>

<Card.Root class="bg-opacity-20">
    <Card.Header>
        <img
            src={recipe.image}
            alt={recipe.label}
            width="300px"
            class="rounded-lg"
        />
        <Card.Title class="w-[300px] truncate">
            {recipe.label}
        </Card.Title>
    </Card.Header>
    <Card.Content>
        <p class="underline">Ingredients:</p>
        <div class="p-5">
            <ul class="list-disc">
                {#each recipe.ingredients as ingredient}
                    {#if checkifInPantry(ingredient.food.toLowerCase())}
                        <li>{ingredient.food}</li>
                    {:else}
                        <li class="text-red-500">{ingredient.food}</li>
                    {/if}
                {/each}
            </ul>
        </div>
    </Card.Content>
    <Card.Footer>
        <div class="flex flex-col gap-4">
            <div class="flex flex-row gap-4 place-items-center">
                <a href={recipe.url} target="_blank">
                    <Button class="gap-2">
                        <Icon icon="lucide:link" class="size-5" />
                        <div class="text-lg">View recipe</div>
                    </Button>
                </a>

                <Button on:click={addMissingIngredientsToList} class="gap-2">
                    <Icon icon="lucide:list" class="size-5" />
                    <div class="text-lg">Add missing to list</div>
                </Button>
            </div>
            <div>
                {#if saved}
                    {#if !hideSave}
                        <Button variant="outline" on:click={unsaveRecipe}>
                            <Icon icon="lucide:bookmark-minus" class="size-5" />
                            <div class="text-lg">Unsave</div>
                        </Button>
                    {:else}
                        <div class="flex flex-row gap-2 place-items-center">
                            <Icon icon="lucide:bookmark-check" class="size-5" />
                            <div class="text-lg text-grey-500">Saved</div>
                        </div>
                    {/if}
                {:else}
                    <Button
                        variant="outline"
                        on:click={saveRecipe}
                        class="gap-2"
                    >
                        <Icon icon="lucide:bookmark" class="size-5" />
                        <div class="text-lg">Save recipe</div>
                    </Button>
                {/if}
            </div>
        </div>
    </Card.Footer>
</Card.Root>
