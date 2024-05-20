<script lang="ts">
    import { goto } from "$app/navigation";
    import { SignedOut, userStore } from "sveltepocket";

    import Login from "$lib/components/auth/login.svelte";

    const user = userStore();
    if ($user) goto("/tests");
</script>

<!-- if user is not signed in -->
<SignedOut>
    <div class="text-xl waves center">
        <Login />
    </div>
</SignedOut>

<style>
    .waves {
        width: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-image: url("svg/waves.svg");
    }
</style>
