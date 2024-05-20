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
   <div class="{ $mode != 'light' ? 'cooking' : '' } h-full">
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
      background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp9319063.jpg&f=1&nofb=1&ipt=7c0580a5c58d7fb06f43de0b87039556bc579025c7f95c063faf533f8e0c850b&ipo=images");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
   }
</style>
