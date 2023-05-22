<script lang="ts">
    import { goto } from "$app/navigation";
    export let avatarHeight = "h-12"
    export let addtlClasses = ""
    export let avatar: string | undefined, displayName: string | undefined, handle: string | undefined
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<img 
    src="{avatar}" 
    alt="{displayName}" 
    class="block {avatarHeight} rounded-md border border-blue-600 m-2 cursor-pointer {addtlClasses}" 
    on:click={() => goto(`/profile/${handle}/`)}
>
