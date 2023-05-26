<script lang="ts">
    import { currentRoute } from "$lib/stores"

</script>

<div class="rounded-2xl h-full inline-flex flex-col text-slate-300  w-full gap-1.5 text-center">
    <h4 class="text-center">Feeds</h4>
    <a href="/" class="feed {$currentRoute == 'Home' ? 'bg-gray-600 text-black' : 'bg-gray-700/40'}">🏠 Home View</a>
    <a href="/feed/fur" class="feed {$currentRoute == 'Fur' ? 'bg-gray-600 text-black' : 'bg-gray-700/40'}">🐾 Furries :3</a>
</div>

<style lang="postcss">

a.feed {
    @apply rounded-md hover:bg-gray-700/80  text-slate-300 text-left px-2 py-0.5 w-5/6 mx-auto text-ellipsis whitespace-nowrap overflow-clip
}

</style>