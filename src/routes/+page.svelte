<script lang="ts">
    import Post from "$lib/Post.svelte";
    import TimelinePost from "$lib/components/TimelinePost.svelte";
    import { goto } from "$app/navigation";
    import { bskyClient } from "$lib/bsky";
    import { logged_in } from "$lib/stores";
    import { onMount } from "svelte";


    onMount(async () => {
        if (!$logged_in) {
            goto('/login')
        }
        console.log(bskyClient.getTimeline())
    })

</script>

{#if $logged_in}

<div class="flex flex-row">
    <Post/>

    <div class="border-x border-blue-700 grow ">
        {#await bskyClient.getTimeline()}
            loading..
        {:then resp}
            <div class="flex flex-col">
                {#each resp.data.feed as posts}

                    <TimelinePost
                        avatar={posts.post.author.avatar}
                        displayName={posts.post.author.displayName}
                        text={posts.post.record.text}
                        handle={posts.post.author.handle}
                        reskeetedBy={posts.reason?.by?.displayName}
                        reskeetedByIcon={posts.reason?.by?.avatar}
                    />
                {/each}
            </div>
        {/await}
    </div>

</div>
{/if}
