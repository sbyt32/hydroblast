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

    <input placeholder="Send skeet..." bind:value={text} class="rounded-md px-1 h-24 "/>
    <button on:click={() => sendSkeet(text)} class="bg-slate-200 rounded-lg">Skeet</button>

    

</div>