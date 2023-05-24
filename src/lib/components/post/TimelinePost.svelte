<script lang="ts">
    import { goto } from "$app/navigation";
    import type { PostView, ReasonRepost, ReplyRef } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
    import { AppBskyFeedDefs } from "@atproto/api";
    import Post from "$lib/components/post/Post.svelte";
    // TODO: make this a interface 
    export let reskeetData: ReasonRepost | undefined | { [k: string]: unknown; $type: string; }
    export let replyData: ReplyRef | undefined
    export let skeetData: PostView
    
</script>

<div class="inline-flex flex-col border-b py-2 relative last:border-none pl-2 overflow-x-hidden">
    {#if AppBskyFeedDefs.isReplyRef(replyData) && AppBskyFeedDefs.isPostView(replyData.parent)}
            <Post
                avatar={replyData.parent.author.avatar}
                displayName={replyData.parent.author.displayName}
                handle={replyData.parent.author.handle}
                skeet={replyData.parent.record}
                images={replyData.parent.embed?.images}

            />
            <div class="border-l absolute ml-8 -z-10" style="content: ''; bottom: calc(10% + 36.9px); height: calc(75% - 36.9px);"/>
    {/if}


    {#if AppBskyFeedDefs.isReasonRepost(reskeetData)}
        <div class="pl-14 inline-flex flex-row text-xs opacity-80 text-slate-100/60 italic">
            Reskeeted by
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img src="{reskeetData.by.avatar}" alt="{reskeetData.by.handle}" class="h-5 rounded-md border-black/60 border ml-2 mr-1 cursor-pointer" on:click={() => goto(`profile/${reskeetData?.by?.handle}`)}>
            {reskeetData.by.displayName}
        </div>
    {/if}


    <Post
        avatar={skeetData.author.avatar}
        displayName={skeetData.author.displayName}
        skeet={skeetData.record}
        handle={skeetData.author.handle}
        images={skeetData.embed?.images}
    />
</div>
