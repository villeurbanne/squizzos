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

            goto("/tests");
            toast.success("Signed in successfully");
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
        <img src="image/lezard.png" class="w-[200px] rounded-3xl" alt="" />
    </Card.Content>

    <Card.Footer class="flex justify-center">
        <Button variant="outline" on:click={signIn}>Login with Github</Button>
    </Card.Footer>
</Card.Root>
