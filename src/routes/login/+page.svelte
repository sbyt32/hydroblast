<script lang="ts">
    import { goto } from "$app/navigation";
    import type { bskyCreds } from "$lib/bsky"
    import { bskyLogin } from "$lib/bsky";
    import { logged_in } from "$lib/stores";
    export let data: bskyCreds

    function handleLogin(login:bskyCreds) {
        bskyLogin({...login})
        $logged_in = true
        setTimeout(() => {
            goto("/")
        }, 500)
    }
</script>

<div class="flex flex-col text-center">
    <div class="inline-flex flex-col gap-2 justify-center h-full">
            <label>
                Username
                <input name="ID" type="text" bind:value={data.identifier}/>
            </label>
            <label>
                Password
                <input name="Password" type="password" bind:value={data.password}/>
            </label>
            <button
                on:click={() => handleLogin(data)}
            >
                Log in
            </button>
    </div>
</div>

<style lang="postcss">

label {
    @apply bg-indigo-400/40 p-2
}

</style>