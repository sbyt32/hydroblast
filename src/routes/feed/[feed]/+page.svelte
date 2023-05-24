<script lang="ts">
    import { bskyClient } from "$lib/bsky";
    import { page } from "$app/stores"
    import { currentRoute } from "$lib/stores";
    import Timeline from "$lib/components/page/Timeline.svelte";

    $currentRoute = $page.params.feed
</script>


<Timeline
    timelineType={"fur"}
/>