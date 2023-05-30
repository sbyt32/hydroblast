<script lang="ts">
    import { bskyClient } from "$lib/bsky";
    // import { page } from "$app/stores"
    import { feedURI } from "$lib/stores";
    import Timeline from "$lib/components/page/Timeline.svelte";

</script>


{#key $feedURI}
    <Timeline
        feedData={{feedType: "feed", feedLink: $feedURI}}
    />
{/key}
