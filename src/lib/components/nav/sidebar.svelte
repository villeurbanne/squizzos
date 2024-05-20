<script lang="ts">
    import { goto } from "$app/navigation";
    import { client } from "sveltepocket";
    import { page } from "$app/stores";
    import Icon from "@iconify/svelte";
    import { setMode, resetMode } from "mode-watcher";

    import { Button } from "$lib/components/ui/button";
    import { Separator } from "$lib/components/ui/separator";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { type PaneAPI } from "paneforge";

    export let sidebar: PaneAPI;
    export let collapsed: boolean;

    async function logout() {
        client.authStore.clear();
        goto("/");
    }

    function collapse() {
        if (collapsed) {
            sidebar.expand();
        } else {
            sidebar.collapse();
        }
    }

    let active: string;
    $: active = $page.url.pathname;
</script>

<div
    class="flex flex-col items-start justify-center h-full p-{collapsed
        ? '1 px-2'
        : '6'}"
>
    {#if !collapsed}
        <img src="image/rupert.png" class="w-24" alt="" />
    {/if}

    <div class="flex flex-col w-full gap-2 text-2xl">
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
                <Button
                    builders={[builder]}
                    variant="ghost"
                    class={collapsed ? "" : "justify-start w-full"}
                >
                    <div class="flex items-center gap-2">
                        <Icon icon="mynaui:paint" class="size-6" />
                        {#if !collapsed}
                            Theme
                        {/if}
                    </div>
                </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content align="end">
                <DropdownMenu.Item on:click={() => setMode("light")}
                    >Light</DropdownMenu.Item
                >
                <DropdownMenu.Item on:click={() => setMode("dark")}
                    >Dark</DropdownMenu.Item
                >
                <DropdownMenu.Item on:click={() => resetMode()}
                    >System</DropdownMenu.Item
                >
            </DropdownMenu.Content>
        </DropdownMenu.Root>

        <Separator class="my-2" />

        <Button
            variant={active == "/dashboard" ? "secondary" : "ghost"}
            href="/dashboard"
            class={collapsed ? "" : "justify-start w-full"}
        >
            <div class="flex items-center gap-2">
                <Icon icon="heroicons:squares-2x2" class="size-6" />
                {#if !collapsed}
                    Dashboard
                {/if}
            </div>
        </Button>
        <Button
            variant={active == "/pantry" ? "secondary" : "ghost"}
            href="/pantry"
            class={collapsed ? "" : "justify-start w-full"}
        >
            <div class="flex items-center gap-2">
                <Icon icon="solar:fridge-outline" class="size-6" />
                {#if !collapsed}
                    Pantry
                {/if}
            </div>
        </Button>
        <Button
            variant={active == "/suggestions" ? "secondary" : "ghost"}
            href="/suggestions"
            class={collapsed ? "" : "justify-start w-full"}
        >
            <div class="flex items-center gap-2">
                <Icon icon="ep:food" class="size-6" />
                {#if !collapsed}
                    Suggestions
                {/if}
            </div>
        </Button>

        <Button
            variant={active == "/bookmarks" ? "secondary" : "ghost"}
            href="/bookmarks"
            class={collapsed ? "" : "justify-start w-full"}
        >
            <div class="flex items-center gap-2">
                <Icon icon="lucide:bookmark" class="size-6" />
                {#if !collapsed}
                    Saved
                {/if}
            </div>
        </Button>
        <Button
            variant={active == "/list" ? "secondary" : "ghost"}
            href="/list"
            class={collapsed ? "" : "justify-start w-full"}
        >
            <div class="flex items-center gap-2">
                <Icon icon="lucide:list" class="size-6" />
                {#if !collapsed}
                    List
                {/if}
            </div>
        </Button>
        <Separator class="my-2" />

        <Button
            variant="ghost"
            class={collapsed ? "" : "justify-start w-full"}
            on:click={collapse}
        >
            <div class="flex items-center gap-2">
                <Icon icon="eva:collapse-fill" class="size-6" />
                {#if !collapsed}
                    Collapse
                {/if}
            </div>
        </Button>

        <Button
            variant="destructive"
            on:click={logout}
            class={collapsed ? "" : "justify-start w-full"}
        >
            <div class="flex items-center gap-2">
                <Icon icon="material-symbols:logout" class="size-6" />
                {#if !collapsed}
                    Logout
                {/if}
            </div>
        </Button>
    </div>
</div>
