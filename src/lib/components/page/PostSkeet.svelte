<script lang="ts">
    import { bskyClient } from '$lib/bsky';
    import { postSkeet } from '$lib/stores';
    import { fade } from 'svelte/transition';

    let text = ""
    async function sendSkeet(text: string) {
        await bskyClient.post({
            text
        })
        // This is intended to refresh on reload, fix that eventually.
    }


</script>

<div class="absolute w-full bg-black/30 h-[calc(100vh-28px)] z-20" transition:fade={{duration: 100}}>

    <div class="relative h-full w-full items-center inline-flex align-middle justify-center">

        <div class="w-1/2 h-56 items-center inline-flex flex-col bg-slate-800 rounded-lg z-40 px-6 border-black border-b">
            <span class=" inline-flex flex-row w-full pb-1">
                <p class="text-center text-base grow">
                    Send Skeet
                </p>
                <button class="text-right  text-slate-300" on:click={() => $postSkeet = false}>X</button>
            </span>
            <textarea 
                placeholder="What's happening?"
                class="rounded-lg h-4/6 pl-2 pt-1 mx-4 resize-none bg-slate-600  text-white w-full" 
                maxlength="240"
                bind:value={text}
            />
            <span class="text-right w-full pr-4 pt-2">
                <button on:click={() => {sendSkeet(text), text = "", $postSkeet = false}} class="bg-slate-400 text-black rounded-lg disabled:opacity-60 disabled:cursor-not-allowed select-none text-sm px-2" disabled="{!text}">
                    🗣️ Skeet
                </button>
            </span>
    
        </div>
    
    </div>

</div>
