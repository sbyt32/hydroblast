<script lang="ts">
    import Icon from "$lib/user/Icon.svelte";
    import { bskyClient } from "$lib/bsky";
    import { AppBskyFeedPost, RichText } from "@atproto/api"
    import { AppBskyEmbedImages } from "@atproto/api";
    
    // TODO: make this a interface
    export let avatar: string | undefined
    export let displayName: string | undefined
    export let skeet: {} | undefined
    export let handle: string | undefined
    export let images: [] | unknown

    // const regexLink = "(http[s]?://[\w./-]*)"
    async function parseSkeet(record: any) {
        const rt = new RichText(record)
        await rt.detectFacets(bskyClient)
        
        let markdown = '<p>'
        for (const segment of rt.segments()) {
            if (segment.isLink()) {
                markdown += `
                <a href="${segment.link?.uri}" class="text-slate-300 hover:text-indigo-400 underline" target="_blank">
                    ${segment.text}
                </a>`
            } else if (segment.isMention()) {
                markdown += `
                <a href="profile/${segment.mention?.did}" class="text-slate-300 hover:text-indigo-400 underline">
                    ${segment.text}
                </a>`            
            } else {
                markdown += segment.text
        }
        }
        // let respHTML: string = ""
        // markdown.split('\n').forEach(e => {
        //     respHTML += `${e}`
        // })


        // return respHTML + "</p>"
        return markdown
    }
</script>

<div class="inline-flex flex-row gap-2">
    {#await parseSkeet(skeet) then skoot}

        <Icon
        avatar={avatar}
        displayName={displayName}
        handle={handle}
        />
    <div class='inline-flex flex-col text-left text-slate-300 mt-2'>

        <span class="text-base flex flex-col leading-5">
            <p>{displayName}</p>
            <p class="text-xs bsky-handle">{handle}</p>
        </span>

        {#if skeet != undefined}
            <div class="text-white leading-relaxed">
                    {@html skoot}
            </div>
        {/if}

        {#if images}
        <div class="flex flex-wrap gap-2">

            {#each images as image}
                <img 
                src={image.thumb} 
                alt="{image.alt}" 
                class="rounded-lg overflow-clip object-fill w-1/2 max-w-xs h-full max-h-80  grow basis-1/3"
                >
            {/each}
        </div>
        {/if}

        <!-- TODO: like and reskeet -->
        <!-- <div class="inline-flex flex-row gap-8 pt-4">
            <button on:click={() => bskyClient.like(uri, cid)}>
                Like
            </button>
            <button on:click={() => bskyClient.repost(uri, cid)}>
                ReSkeet
            </button>
        </div> -->

    </div>
    {/await}

</div>
