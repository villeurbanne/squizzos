<script lang="ts">
    import Login from "$lib/components/auth/login.svelte";
    import * as Card from "$lib/components/ui/card";
    import { SignedIn, SignedOut } from "sveltepocket";
    import { slide } from "svelte/transition";
    import { page } from "$app/stores";
    import { mode } from "mode-watcher";

    import * as Resizable from "$lib/components/ui/resizable/index.js";
    import Sidebar from "$lib/components/nav/sidebar.svelte";
    import { type PaneAPI } from "paneforge";

    let collapsed = false;
    let sidebar: PaneAPI;
</script>

<!-- if user is signed in -->
<SignedIn>
    <div class="{$mode != 'light' ? 'cooking' : ''} h-full">
        <Card.Root class="w-full h-full p-4 bg-opacity-70 backdrop-blur-sm">
            <Resizable.PaneGroup
                direction="horizontal"
                autoSaveId="sidebarSize"
                class="border border-gray-600 rounded-lg"
            >
                <!-- content -->
                <Resizable.Pane defaultSize={88}>
                    {#key $page.url.pathname}
                        <div transition:slide={{ duration: 300 }}>
                            <slot />
                        </div>
                    {/key}
                </Resizable.Pane>

                <Resizable.Handle withHandle />

                <!-- sidebar -->
                <Resizable.Pane
                    defaultSize={15}
                    collapsedSize={4}
                    collapsible={true}
                    minSize={15}
                    maxSize={15}
                    bind:pane={sidebar}
                    onCollapse={() => (collapsed = true)}
                    onExpand={() => (collapsed = false)}
                >
                    <Sidebar {sidebar} {collapsed} />
                </Resizable.Pane>
            </Resizable.PaneGroup>
        </Card.Root>
    </div>
</SignedIn>

<!-- if user is not signed in -->
<SignedOut>
    <div class="center">
        <Login />
    </div>
</SignedOut>

<style>
    .cooking {
        background-image: url("https://r4.wallpaperflare.com/wallpaper/345/429/318/olympic-games-hd-usain-bolt-wallpaper-39e0786d719a8dfbd657389fa0e1c62d.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
