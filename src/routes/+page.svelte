<script lang="ts">
    import { goto } from "$app/navigation";
    import { logged_in} from "$lib/stores";
    import { onMount } from "svelte";
    import Timeline from "$lib/components/page/Timeline.svelte";

    import { currentRoute } from "$lib/stores";
    $currentRoute = `Home`

    onMount(async () => {
        if (!$logged_in) {
            goto('/login')
        }
        else{
            // console.log(bskyClient.getTimeline())
        }
    })

</script>

{#if $logged_in}
<!-- <div class="max-h-[calc(100vh-28px)] border-l-2 border-blue-700 w-[calc(100vw-13rem)] relative"> -->

    <Timeline
        feedData={{
            feedType: "timeline"
        }}
    />
<!-- </div> -->
{/if}

