<script lang="ts">
    import { bskyClient } from '$lib/bsky';
    let text = ""
    async function sendSkeet(text: string) {
        await bskyClient.post({
            text
        })
    }
</script>

<div class="inline-flex flex-col mx-4 my-2 gap-2">

    <textarea placeholder="Send skeet..." bind:value={text} class="rounded-md px-1 h-32 resize-none bg-slate-700 border-2 border-black text-white " maxlength="240"/>
    <button on:click={() => {sendSkeet(text), text = ""}} class="bg-slate-200 rounded-lg disabled:opacity-60" disabled="{!text}">Skeet</button>



</div>