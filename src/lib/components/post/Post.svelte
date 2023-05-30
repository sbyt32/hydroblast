<script lang="ts">
    import Icon from "$lib/user/Icon.svelte";
    import { bskyClient, parseSkeet } from "$lib/bsky";
    import { AppBskyEmbedImages } from "@atproto/api";
    import type { ProfileViewBasic} from "@atproto/api/dist/client/types/app/bsky/actor/defs";
    import type { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
    // AppBskyEmbedImages

    // TODO: make this a interface
    export let author: ProfileViewBasic
    export let skeet: PostView

</script>

<div class="inline-flex flex-row gap-2 pb-2 ">

        <Icon
        avatar={author.avatar}
        displayName={author.displayName}
        handle={author.handle}
        />
    <div class='inline-flex flex-col text-left text-slate-300 mt-2 w-4/5'>

        <span class="text-base flex flex-col leading-5 ">
            <span class="inline-flex flex-row">
                <span class="w-full">
                    <a href="/profile/{author.handle}" class="w-fit">{author.displayName}</a>
                </span>

                {#if !author.viewer?.following}
                    <button class="text-right -mt-0.5 mx-24 bg-slate-700" on:click={() => bskyClient.follow(author.did)}>Follow</button>                    
                {/if}
            
            </span>
            <a href="/profile/{author.handle}" class="text-xs bsky-handle  w-fit" >{author.handle}</a>
        </span>

        {#if skeet != undefined}
            {#await parseSkeet(skeet.record) then skoot}
                <div class="text-white leading-relaxed prose">
                        {@html skoot}
                </div>
            {/await}

            {#if AppBskyEmbedImages.isView(skeet.embed)}
            <div class="flex flex-wrap gap-2">
                {#each skeet.embed.images as image}
                    <img 
                    src={image.thumb} 
                    alt="{image.alt}" 
                    class="rounded-lg overflow-hidden object-fill w-1/2 max-w-xs h-full max-h-48 grow basis-1/4 z-10"
                    >
                {/each}
            </div>
            {/if}

        {/if}



        <!-- TODO: like and reskeet -->
        <div class="inline-flex flex-row gap-4 mt-3 pt-1 text-base opacity-60 leading-5">
            <button>
                🗨️ <span class="tabular-nums pl-1">{skeet.replyCount}</span>
            </button>
            <button on:click={() => skeet.viewer?.like ? bskyClient.deleteLike(skeet.viewer?.like) : bskyClient.like(skeet.uri, skeet.cid)}>
                👍 <span class="tabular-nums">{skeet.likeCount}</span>
            </button>
            <button on:click={() => skeet.viewer?.repost ? bskyClient.deleteRepost(skeet.viewer?.repost) : bskyClient.repost(skeet.uri, skeet.cid)}>
                💦 <span class="tabular-nums">{skeet.repostCount}</span>
            </button>
            <p class="text-end italic text-sm mt-0.5 grow">
                {new Date(skeet.indexedAt).toLocaleTimeString()} - {new Date(skeet.indexedAt).toDateString()}
            </p>
        </div>

    </div>

</div>

<style lang="postcss">
button {
    @apply  rounded px-1.5 py-0.5 hover:bg-slate-700 transition-all  hover:opacity-100
}
</style>