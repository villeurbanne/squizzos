<script lang="ts">
    import { App } from "sveltepocket";
    import { ModeWatcher } from "mode-watcher";
    import { Toaster } from "$lib/components/ui/sonner";
    import { env } from "$env/dynamic/public";

    import "../app.css";
</script>

<ModeWatcher />
<Toaster />

<!-- init the pocketbase app -->
<App url={env.PUBLIC_POCKETBASE_URL} let:client>
    <div class="h-screen min-w-screen">
        <slot />
    </div>
</App>
