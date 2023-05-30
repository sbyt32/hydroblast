<script lang="ts">
    import { currentRoute, feedURI } from "$lib/stores";
    import { bskyClient } from "$lib/bsky";
    import Icon from "./Icon.svelte";
    export let feedName: string
    
</script>

{#await bskyClient.app.bsky.feed.getFeedGenerator({feed: feedName})}
<a href="/" class="feed {$currentRoute == 'Home' ? 'bg-gray-600 text-black' : 'bg-gray-700/40'}">
    Loading...
</a>
    
{:then feedData} 
    {#if feedData.success}
        <a  href="/feed/{feedData.data.view.displayName}" 
            class="feed {$currentRoute === feedData.data.view.displayName ? 'bg-gray-600 text-black' : 'bg-gray-700/40'} inline-flex text-sm transition-all" 
            on:click={() => {
                $feedURI = feedData.data.view.uri, 
                $currentRoute = feedData.data.view.displayName
                }
            }>
            <Icon 
                avatar={feedData.data.view.avatar}
                displayName={feedData.data.view.displayName}
                handle={feedData.data.view.creator.handle}
                avatarHeight={"h-5 mr-2 ml-0 my-0.5"}
            />
            {feedData.data.view.displayName}
        </a>            
    {/if}
    
{/await}

<style lang="postcss">
a.feed {
    @apply rounded-md hover:bg-gray-700/80 text-slate-300 text-left px-2 py-0.5 w-5/6 mx-auto text-ellipsis whitespace-nowrap overflow-clip
}
</style>