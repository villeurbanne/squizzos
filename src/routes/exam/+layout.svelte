<script lang="ts">
    import Login from "$lib/components/auth/login.svelte";
    import * as Card from "$lib/components/ui/card";
    import { SignedIn, SignedOut } from "sveltepocket";
    import { slide } from "svelte/transition";
    import { page } from "$app/stores";
    import { mode } from "mode-watcher";
</script>

<!-- if user is signed in -->
<SignedIn>
    <div class="{$mode != 'light' ? 'cooking' : ''} h-full">
        <Card.Root class="w-full h-full p-4 bg-opacity-70 backdrop-blur-sm">
            {#key $page.url.pathname}
                <div transition:slide={{ duration: 300 }}>
                    <slot />
                </div>
            {/key}
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
        background-image: url("https://r4.wallpaperflare.com/wallpaper/1007/683/727/london-olympic-venues-night-view-wallpaper-190098cd517a3deb169798df60f1b69d.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
