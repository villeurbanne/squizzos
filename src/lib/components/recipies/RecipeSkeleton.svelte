<script lang="ts">
    import { Skeleton } from "$lib/components/ui/skeleton";
    import * as Card from "$lib/components/ui/card/";
</script>

<Card.Root class="bg-opacity-20">
    <Card.Header>
        <Skeleton class="h-[300px] w-[300px] bg-black bg-opacity-40" />
        <Skeleton class="h-[20px] w-[100px] rounded-full bg-black bg-opacity-40" />
    </Card.Header>
</Card.Root>
