<script lang="ts">
    import { bskyClient } from '$lib/bsky';
    import { refresh } from '$lib/stores';
    let text = ""
    async function sendSkeet(text: string) {
        await bskyClient.post({
            text
        })
        // This is intended to refresh on reload, fix that eventually.
        refresh.set(0)
    }
</script>

<div class="h-full pt-4 mx-3">

    <input 
    type="text"
    class="rounded-lg pl-0.5 bg-slate-600 border-2 border-black text-white w-fit mb-2"
    placeholder="Search..."
    >
    
    <textarea 
        placeholder="Send skeet..."
        class="rounded-md px-2 h-32 resize-none bg-slate-600 border-2 border-black text-white w-full" 
        maxlength="240"
        bind:value={text}
    />
    <button on:click={() => {sendSkeet(text), text = ""}} class="bg-slate-200 rounded-lg disabled:opacity-60 select-none w-full" disabled="{!text}">
        Skeet
    </button>

</div>
