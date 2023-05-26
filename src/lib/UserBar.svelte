<script lang="ts">
    import { bskyClient } from '$lib/bsky';
    import { logged_in, userData } from "$lib/stores"
    import { goto } from "$app/navigation";
    import LoggedInUser from '$lib/components/userbar/LoggedInUser.svelte';
    import Feeds from "$lib/user/Feeds.svelte";

    let text = ""
    async function sendSkeet(text: string) {
        await bskyClient.post({
            text
        })
        // This is intended to refresh on reload, fix that eventually.
    }

</script>
<div class="inline-flex flex-col gap-2 w-52  h-[calc(100vh-28px)]">


    <Feeds/>

    <LoggedInUser/>


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
                    on:click={() => {goto(`/profile/${$userData.handle}`)}}
                />
            </div>
        {/if}

    </div>
</div>

<style lang="postcss">
    div.userbar-icon {
        @apply inline-flex items-center w-8 h-9 justify-center z-50 hover:bg-rose-900 transition-all cursor-pointer
    }
</style>