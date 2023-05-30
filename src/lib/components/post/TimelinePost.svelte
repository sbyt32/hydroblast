<script lang="ts">
    import { goto } from "$app/navigation";
    import type { PostView, ReasonRepost, ReplyRef, NotFoundPost, BlockedPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
    import { AppBskyFeedDefs } from "@atproto/api";
    import Post from "$lib/components/post/Post.svelte";
    export let reskeetData: ReasonRepost | undefined | { [k: string]: unknown; $type: string; }
    export let replyData: PostView | NotFoundPost | BlockedPost | { [k: string]: unknown; $type: string; } | undefined
    export let skeetData: PostView
    
</script>

<div class="inline-flex flex-col  py-2 relative  pl-2 overflow-x-hidden group ">

    <span class="w-full h-full inline-flex flex-col">

    {#if AppBskyFeedDefs.isReasonRepost(reskeetData)}
        <div class="pl-14 inline-flex flex-row text-xs opacity-80 text-slate-100/60 italic">
            Reskeeted by
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img 
                src="{reskeetData.by.avatar}" 
                alt="{reskeetData.by.handle}" 
                class="h-5 rounded-md border-black/60 border ml-2 mr-1 cursor-pointer" 
                on:click={() => {AppBskyFeedDefs.isReasonRepost(reskeetData) ? goto(`profile/${reskeetData.by.handle}`) : null}}>
            {reskeetData.by.displayName}
        </div>

    {:else if AppBskyFeedDefs.isPostView(replyData)}
            <div class="border-l absolute ml-8 -z-10" style="content: ''; top: calc(0% + 28px); height: calc(40% - 28px);"/>

            <Post
                author={replyData.author}
                skeet={replyData}
            />

            {/if}

    <Post
        author={skeetData.author}
        skeet={skeetData}
    />

    </span>
    <div class="border-b  border-b-blue-500/50 border-double group-last:border-0    w-[90%] self-center"/>
</div>
