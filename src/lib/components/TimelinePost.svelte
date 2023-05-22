<script lang="ts">
    import { goto } from "$app/navigation";
    import Post from "$lib/components/post/Post.svelte";
    export let avatar: string | undefined
    export let displayName: string | undefined
    export let text: string | undefined
    export let handle: string | undefined
    // TODO: make this a interface  
    export let reskeetedBy: string | undefined = undefined
    export let reskeetedByIcon: string | undefined = undefined
    export let reskeetedByHandle: string | undefined = undefined
    export let images: [] | undefined
    let reskeetImages: [] | undefined
    export let replySkeetData = {
        avatar : "",
        displayName: "",
        text: "",
        handle: "",
        images: reskeetImages,
    }
</script>

<div class="inline-flex flex-col border-b py-2 relative last:border-none pl-2 overflow-x-hidden">
    {#if replySkeetData.avatar && replySkeetData.displayName && replySkeetData.handle && replySkeetData.text}
            <Post 
                avatar={replySkeetData.avatar}
                displayName={replySkeetData.displayName}
                handle={replySkeetData.handle}
                text={replySkeetData.text}
                images={replySkeetData.images}

            />
            <!-- Divider -->
            <div class="border-l absolute ml-8 -z-10" style="content: ' '; bottom: calc(10% + 36.9px); height: calc(75% - 36.9px);"/>
    {/if}


    {#if reskeetedBy}
        <div class="pl-14 inline-flex flex-row text-xs opacity-80 text-slate-100/60 italic">
            Reskeeted by
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img src="{reskeetedByIcon}" alt="{reskeetedBy}" class="h-5 rounded-md border-black/60 border ml-2 mr-1 cursor-pointer" on:click={() => goto(`/profile/${reskeetedByHandle}`)}>
            {reskeetedBy}
        </div>
    {/if}

    <Post
        avatar={avatar}
        displayName={displayName}
        text={text}
        handle={handle}
        images={images}
    />

</div>
