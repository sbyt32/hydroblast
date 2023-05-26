<script lang="ts">
    import type { Response } from "@atproto/api/dist/client/types/app/bsky/feed/getTimeline";
    import TimelinePost from "$lib/components/post/TimelinePost.svelte";
    import { bskyClient } from "$lib/bsky";
    import { onMount } from "svelte";
    import { postSkeet } from "$lib/stores";
    export let timelineType = "timeline"
    export let DID:string | null = null
    export let hasBanner: boolean = false


    let timelineData: Response 
    onMount(async () => {
        switch (timelineType) {
            case "timeline":
                console.log(await bskyClient.getTimeline());
                
                timelineData = await bskyClient.getTimeline()
                break;
            case "userpost":
                if (DID) {
                    timelineData = await bskyClient.getAuthorFeed({actor: DID})
                }
                break;
            case "fur":
                // TODO: Save Algo
                console.log(await bskyClient.api.app.bsky.feed.getActorFeeds({actor: "furryli.st"}))
                timelineData = await bskyClient.api.app.bsky.feed.getFeed({feed: "at://did:plc:jdkvwye2lf4mingzk7qdebzc/app.bsky.feed.generator/furry-new"})
                break;
                // timelineData = await bskyClient.getAuthorFeed({actor: })
            default:
                break;
        }
    })

</script>



<div class="border-l-2 border-blue-700 overflow-x-hidden w-full {hasBanner ? 'max-h-[calc(100vh-228px)]': 'max-h-[calc(100vh-28px)]' }" >


    <div class="absolute max-h-screen w-[95%] {hasBanner ? 'h-[calc(95vh-228px)]' : 'h-[calc(95vh-28px)]'}">
        <div class="absolute w-full text-right bottom-0  align-text-bottom z-50">
            <button class="bg-blue-500 
                shadow-md shadow-blue-500  
                border border-black/10 
                rounded-full text-black 
                px-4 py-2 text-lg font-mono 
                opacity-80 hover:opacity-100 
                transition-all duration-150"
                on:click={() => $postSkeet = true}
                >
                🗒️
            </button>
        </div>
    </div>


    <div class="flex flex-col">

    {#if timelineData}

        
        {#each timelineData.data.feed as posts}
            <TimelinePost
                reskeetData={posts.reason}
                replyData={posts.reply?.parent}
                skeetData={posts.post}
            />
        {/each}

    {/if}

    </div>

</div>