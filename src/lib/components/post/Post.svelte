<script lang="ts">
    import Icon from "$lib/user/Icon.svelte";

    // TODO: make this a interface
    export let avatar: string | undefined
    export let displayName: string | undefined
    export let text: string | undefined
    export let handle: string | undefined
    export let images: [] | undefined


    // const regexLink = "(http[s]?://[\w./-]*)"
    function parseSkeet(text:string) {
        let respHTML = ""
        let textLines = text.split("\n")
        textLines.forEach(e => {
            // if ()
            respHTML += `<p class="leading-relaxed">${e}</p>`
        });
        return `
            <div class="text-left w-full text-lg py-2">
                    ${respHTML}
            </div>
            `
    }
</script>

<div class="inline-flex flex-row gap-2">
    <Icon
    avatar={avatar}
    displayName={displayName}
    handle={handle}
    />
    <div class="inline-flex flex-col text-left text-slate-300 mt-2">

        <span class="text-base flex flex-col leading-3">
            <p>{displayName}</p>
            <p class="text-xs bsky-handle">{handle}</p>
        </span>

        {#if text != undefined}
            {@html parseSkeet(text)}
        {/if}

        {#if images}
        <div class="inline-flex gap-2 content-center">
            {#each images as image}
                <img src={image.thumb} alt="{image.alt}" class="h-48 rounded-lg object-scale-down">
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
</div>

<!-- <style lang="postcss">
button {
    @apply bg-slate-700 text-slate-200 px-4 rounded-md text-sm w-fit
}
</style> -->