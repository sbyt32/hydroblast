<script lang="ts">
    import { goto } from "$app/navigation";
    import type { bskyCreds } from "$lib/bsky"
    import { bskyClient } from "$lib/bsky";
    import { logged_in, userData } from "$lib/stores";
    export let data: bskyCreds

    let failedLogin = false;
    
    async function bskyLogin(login:bskyCreds) {
        try {
            const hello = await bskyClient.login({...data})
            if (hello.success) {
                goto('/')
                logged_in.update(() => true)
                const user = await bskyClient.getProfile({actor: hello.data.handle})
                if (user.data.avatar && user.data.displayName && user.data.handle) {
                    userData.set({
                        avatar: user.data.avatar,
                        handle: user.data.handle,
                        displayName: user.data.displayName
                    })    
                }
            }
        } catch (e) {
            failedLogin = true
        }
}


</script>
<div class=" text-center justify-center grow h-[calc(100vh-28px)]">
    <div class="inline-flex flex-col justify-center h-full border-blue-700 h w-1/4">
        <div class="inline-flex flex-col bg-indigo-200/10 rounded-2xl gap-1 p-3">

            <label>
                <input name="atpthing" type="text" placeholder="https://bsky.social">
            </label>
            <label>
                <input name="ID" type="text" bind:value={data.identifier} placeholder="hello.bsky.social"/>
            </label>
            <label>
                <input name="Password" type="password" bind:value={data.password} placeholder="Password" />
            </label>
            <div>
                <button
                on:click={() => bskyLogin(data)}
                disabled={!data.password && !data.identifier}
                class="text-slate-300 disabled:text-slate-300/30 bg-slate-700 px-4 rounded-md"
                >
                    Log In
                </button>

            </div>
            {#if failedLogin}
                <div class="bg-red-400 rounded-md transition-all">
                    Invalid ID or Password
                </div>                
            {/if}
        </div>

    </div>
</div>

<style lang="postcss">

label {
    @apply bg-indigo-400/20 px-2 py-3 rounded-md
}

input {
    @apply focus:text-left placeholder:text-center bg-slate-700 border-black border text-white
}

</style>