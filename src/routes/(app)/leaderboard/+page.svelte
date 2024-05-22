<script lang="ts">
    import PocketBase from "pocketbase";
    import { onMount } from "svelte";
    const pb = new PocketBase("https://squizzos.pockethost.io");
    import * as Table from "$lib/components/ui/table/index.js";

    let leaderboard: any = null;

    onMount(async () => {
        leaderboard = await pb.collection("users").getList(1, 50, {
            sort: "-score",
        });
        if (!leaderboard.items) leaderboard = null;
    });
</script>

<div class="p-10">
    <div class="text-2xl text-white pb-5">Leaderboard</div>
    {#if !leaderboard}
        <div>Loading...</div>
    {/if}
    {#if leaderboard}
        <Table.Root>
            <Table.Caption>Leaderboard of top 50 Squizzos players.</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head class="w-[100px]">Rank</Table.Head>
                    <Table.Head>Username</Table.Head>
                    <Table.Head class="text-right">Score</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each leaderboard.items as user, i (i)}
                    <Table.Row>
                        <Table.Cell>{i + 1}</Table.Cell>
                        <Table.Cell>{user.username}</Table.Cell>
                        <Table.Cell class="text-right">{user.score}</Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    {/if}
</div>
