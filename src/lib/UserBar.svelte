<script>
    import PostSkeet from "$lib/components/page/PostSkeet.svelte";
    import { bskyClient } from '$lib/bsky';
    import Icon from "./user/Icon.svelte";
    import { logged_in, userData, currentRoute } from "$lib/stores"
    import { goto } from "$app/navigation";

</script>
<div class="inline-flex flex-col gap-2 w-56">

    <PostSkeet/>

    <div class="rounded-2xl h-full inline-flex flex-col text-slate-300 w-full grow gap-1.5">
        <h4 class="text-center mx-0">Feeds</h4>
        <a href="/" class="feed {$currentRoute == 'Home' ? 'bg-gray-600 text-black' : 'bg-gray-700/40'}">🏠 Home View</a>
        <a href="/feed/Fur" class="feed {$currentRoute == 'Fur' ? 'bg-gray-600 text-black' : 'bg-gray-700/40'}">🐾 Furries :3</a>
    </div>

    <!-- Logged-in User -->
    <div class=" rounded-2xl h-fit inline-flex flex-row text-slate-300 align-middle w-full ">
        <!-- ? Someone tell me this works correctly?? -->
        {#await bskyClient.getProfile({actor: $userData.handle}) then data}
        <Icon
            displayName={data.data.displayName}
            avatar={data.data.avatar}
            handle={data.data.handle}
        />
        <div class="text-xs inline-flex flex-col">
            <p>{data.data.displayName}</p>
            <p class="bsky-handle">{data.data.handle}</p>
            <p>Followers: {data.data.followersCount}</p>
            <p>Following: {data.data.followsCount}</p>
        </div>
        {/await}
    </div>

    <!-- Bottom Bar -->
    <div class="bg-slate-800 border-blue-600 border-t-2 pl-1 pr-1 first:pr-0 last:pl-0">

        {#if $logged_in}
            <div class="userbar-icon" id="titlebar-home">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img
                    src="https://api.iconify.design/mdi-light/home.svg?color=white"
                    alt="Home"
                    width="24px"
                    height="24px"
                    on:click={() => {goto('/')}}
                />
            </div>
            <div class="userbar-icon" id="titlebar-home">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img
                    src="https://api.iconify.design/mdi-light/account.svg?color=white"
                    alt="Home"
                    width="24px"
                    height="24px"
                    on:click={() => {goto(`profile/${$userData.handle}`)}}
                />
            </div>
        {/if}

    </div>
</div>

<style lang="postcss">
    div.userbar-icon {
        @apply inline-flex items-center w-8 h-9 justify-center z-50 hover:bg-rose-900 transition-all cursor-pointer
    }
    a.feed {
        @apply mx-2 rounded-md hover:bg-gray-700/80  text-slate-300 text-left pl-1 py-0.5
    }
</style>