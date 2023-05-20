<script lang="ts">
    export let avatar: string | undefined
    export let displayName: string | undefined
    export let text: string | undefined
    export let handle: string | undefined
    // TODO: make this a interface  
    export let reskeetedBy: string | undefined
    export let reskeetedByIcon: string | undefined
</script>

<div class="inline-flex flex-col border-b py-2">
    {#if reskeetedBy}
    <div class="pl-12 inline-flex flex-row text-sm opacity-80">
        <p class="text-slate-100/60 italic"> Reskeeted by</p>
        <img src="{reskeetedByIcon}" alt="{reskeetedBy}" class="h-5 rounded-lg border-black/60 border ml-2 mr-1">
        <p class="text-slate-100/60 italic">{reskeetedBy}</p> 
    </div>
    {/if}
    <div class="inline-flex flex-row gap-1">
        <img src="{avatar}" alt="{displayName}" class="block h-12 rounded-md border-black/60 border m-2">

        <div class="inline-flex flex-col text-left text-slate-100 mt-2">

            <span class="text-sm flex flex-col leading-3">
                <p>{displayName}</p>
                <p class="text-xs opacity-60 italic">@{handle}</p>
            </span>
            <p class="w-full text-lg py-2 leading-5">
                {text}
            </p>    
        </div>
    </div>
</div>


<!--            {#if posts.reason?.by?.displayName}
                    {posts.reason?.by?.displayName}
                {/if} 
-->