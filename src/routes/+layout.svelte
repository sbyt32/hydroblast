<script lang="ts">
  import { appWindow } from "@tauri-apps/api/window";
  import { logged_in, currentRoute, postSkeet } from "$lib/stores"
  import "../app.postcss";
  import UserBar from "$lib/UserBar.svelte";
  import PostSkeet from "$lib/components/page/PostSkeet.svelte";
  import { page } from "$app/stores";

  // async function titleName(route:string) {
  //   return await invoke('titlebar_name', {route})
  // }

</script>

<div class="max-h-screen overflow-y-auto scrollbar">
  <div data-tauri-drag-region class="titlebar overflow-hidden">
  
    <div class="text-slate-200 text-center text-sm pt-0.5 grow justify-center" data-tauri-drag-region>
      {#key $currentRoute}
        Hydroblast - {$currentRoute}
        {$page.url}
      {/key}
    </div>
  
  
    <div class="inline-flex flex-row-reverse">
  
      <div class="titlebar-button" id="titlebar-close">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img src="https://api.iconify.design/mdi:close.svg?color=white" 
        alt="close" 
        on:click={() => appWindow.close()}
        width="20px"
        height="20px"
        />
      </div>
      <div class="titlebar-button" id="titlebar-maximize">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
          src="https://api.iconify.design/mdi:window-maximize.svg?color=white"
          alt="maximize"
          on:click={() => appWindow.toggleMaximize()}
          width="20px"
          height="20px"

        />
        </div>
  
        <div class="titlebar-button" id="titlebar-minimize">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <img
          src="https://api.iconify.design/mdi:window-minimize.svg?color=white"
          alt="minimize"
          on:click={() => appWindow.minimize()}
          width="20px"
          height="20px"
          />
        </div>


  
    </div>
  
  </div>
  
  <body class="mt-7">
    {#if $postSkeet}
      <PostSkeet/>
      
    {/if}

      <div class="flex flex-row">
        {#if $logged_in}
          <UserBar/>
          <div class="max-h-[calc(100vh-28px)] border-l-2 border-blue-700 w-[calc(100vw-13rem)] relative">
            <slot />
          </div>
        {:else}
          <slot />

        {/if}

      </div>
  </body>
  
</div>