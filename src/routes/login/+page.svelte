<script lang="ts">
    import { goto } from "$app/navigation";
    import type { bskyCreds } from "$lib/bsky"
    import { bskyLogin } from "$lib/bsky";
    import { logged_in } from "$lib/stores";
    export let data: bskyCreds

    function handleLogin(login:bskyCreds) {
        bskyLogin({...login})
        setTimeout(() => {
            $logged_in = true
            goto("/")
        }, 750)
    }
</script>
<div class=" text-center justify-center grow h-[calc(100vh-28px)]">
    <div class="inline-flex flex-col justify-center h-full border-blue-700 h w-1/4">
        <div class="inline-flex flex-col bg-indigo-200/10 rounded-2xl gap-4 p-3">
            <label>
                <input name="ID" type="text" bind:value={data.identifier} placeholder="hello.bsky.social"/>
            </label>
            <label>
                
                <input name="Password" type="password" bind:value={data.password} placeholder="Password"/>
            </label>
            <div>
                <button
                on:click={() => handleLogin(data)}
                disabled={!data.password && !data.identifier}
                class="text-slate-300 disabled:text-slate-300/30 bg-slate-700 px-4 rounded-md"
            >
                Log In
            </button>

            </div>

        </div>

    </div>
</div>

<style lang="postcss">

label {
    @apply bg-indigo-400/20 px-2 py-3 rounded-md
}

input {
    @apply focus:text-left placeholder-shown:text-center placeholder:text-center bg-slate-700 border-black border 
}

</style>