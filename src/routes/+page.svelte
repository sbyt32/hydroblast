<script lang="ts">
    import TimelinePost from "$lib/components/TimelinePost.svelte";
    import { goto } from "$app/navigation";
    import { bskyClient } from "$lib/bsky";
    import { logged_in, refresh } from "$lib/stores";
    import { onMount } from "svelte";


    onMount(async () => {
        if (!$logged_in) {
            goto('/login')
        }
        else{
            // console.log(bskyClient.getTimeline())
        }
    })

</script>

{#if $logged_in}
<div class="max-h-[calc(100vh-28px)] border-l-2 border-blue-700 grow overflow-x-auto">
    <div class="flex flex-col">
        {#key refresh}
            
            {#await bskyClient.getTimeline()}
                loading..
            {:then resp}
                    {#each resp.data.feed as posts}
        <!-- TODO: Really gotta fix this -->
                        <TimelinePost
                            avatar={posts.post.author.avatar}
                            displayName={posts.post.author.displayName}
                            text={posts.post.record.text}
                            handle={posts.post.author.handle}
                            reskeetedBy={posts.reason?.by?.displayName}
                            reskeetedByIcon={posts.reason?.by?.avatar}
                            reskeetedByHandle={posts.reason?.by?.handle}
                            replySkeetData={
                                {
                                    avatar: posts.reply?.parent?.author?.avatar,
                                    displayName: posts.reply?.parent?.author?.displayName,
                                    text: posts.reply?.parent?.record?.text,
                                    handle: posts.reply?.parent?.author?.handle,
                                    images: posts.reply?.parent?.embed?.images,
                                }
                            }
                            images={posts.post.embed?.images}
                        />
                    {/each}
            {/await}
        {/key}
    </div>
</div>
{/if}
