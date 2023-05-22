<script>
    import PostSkeet from "$lib/components/page/PostSkeet.svelte";
    import { bskyClient } from '$lib/bsky';
    import Icon from "./user/Icon.svelte";
    import { logged_in, userData } from "$lib/stores"
    import { goto } from "$app/navigation";

</script>
<div class="inline-flex flex-col gap-2 w-56">

    <PostSkeet/>

    <div class=" rounded-2xl h-fit inline-flex flex-row text-slate-300 align-middle border-blue-500/20 w-full mx-2">
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

    <div class="bg-slate-800 border-blue-600 border-t-2 pl-1 pr-1 first:pr-0 last:pl-0">

        {#if $logged_in}
            <div class="inline-flex items-center w-8 h-9 justify-center z-50 hover:bg-rose-900 transition-all" id="titlebar-home">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img
                    src="https://api.iconify.design/mdi-light/home.svg?color=white"
                    alt="Home"
                    width="24px"
                    height="24px"
                    on:click={() => {goto('/')}}
                />
            </div>
            <div class="inline-flex items-center w-8 h-9 justify-center z-50 hover:bg-rose-900 transition-all" id="titlebar-home">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img
                    src="https://api.iconify.design/mdi-light/account.svg?color=white"
                    alt="Home"
                    width="24px"
                    height="24px"
                    on:click={() => {goto('/')}}
                />
            </div>
        {/if}

    </div>
</div>