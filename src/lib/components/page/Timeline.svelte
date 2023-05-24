<script lang="ts">
    import type { Response } from "@atproto/api/dist/client/types/app/bsky/feed/getTimeline";
    import TimelinePost from "$lib/components/post/TimelinePost.svelte";
    import { goto } from "$app/navigation";
    import { bskyClient } from "$lib/bsky";
    import { logged_in, refresh } from "$lib/stores";
    import { onMount } from "svelte";
    import { BskyAgent } from "@atproto/api";
    export let timelineType = "timeline"
    export let DID:string | null = null


    let timelineData: Response 
    onMount(async () => {
        switch (timelineType) {
            case "timeline":
                timelineData = await bskyClient.getTimeline()
            case "userpost":
                if (DID) {
                    timelineData = await bskyClient.getAuthorFeed({actor: DID})
                }
            case "fur":
                // console.log(await bskyClient.api.app.bsky.feed.getActorFeeds({actor: "furryli.st"}))
                timelineData = await bskyClient.api.app.bsky.feed.getFeed({feed: "at://did:plc:jdkvwye2lf4mingzk7qdebzc/app.bsky.feed.generator/furry-new"})
                // timelineData = await bskyClient.getAuthorFeed({actor: })
            default:
                break;
        }
    })

</script>



<div class="max-h-[calc(100vh-28px)] border-l-2 border-blue-700 grow overflow-x-auto">
    <div class="flex flex-col">
    {#if timelineData}
        
        {#each timelineData.data.feed as posts}
            <TimelinePost
                reskeetData={posts.reason}
                replyData={posts.reply}
                skeetData={posts.post}
            />
        {/each}

    {/if}

    </div>
</div>