<script lang="ts">
    import { bskyClient } from "$lib/bsky";
    import Feed from "./Feed.svelte";
    import { AppBskyActorDefs } from "@atproto/api";
</script>

<div class="rounded-2xl h-full inline-flex flex-col text-slate-300 w-full gap-1.5 text-center">
    <h4 class="text-center">Feeds</h4>
    {#await bskyClient.app.bsky.actor.getPreferences() then feeds}
        {#if AppBskyActorDefs.isSavedFeedsPref(feeds.data.preferences[0])}
        {#each feeds.data.preferences[0].pinned as feed}
            <Feed
                feedName={feed}
            />            
        {/each}
            
        {/if}
        
    {/await}        
</div>