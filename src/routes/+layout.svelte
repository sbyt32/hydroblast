<script lang="ts">
  import { goto } from "$app/navigation";
  import { invoke } from "@tauri-apps/api/tauri";
  import { appWindow } from "@tauri-apps/api/window";
  import { logged_in } from "$lib/stores"
  import "../app.postcss";
  import UserBar from "$lib/UserBar.svelte";


  async function titleName(route:string) {
    return await invoke('titlebar_name', {route})
  }

</script>

<div class="max-h-screen overflow-y-auto scrollbar">
  <div data-tauri-drag-region class="titlebar overflow-hidden">
  
    <div class="text-slate-200 text-center text-sm pt-0.5 grow justify-center" data-tauri-drag-region>
      {#await titleName('Home') then data}
        {data}
      {/await}
    </div>
  
  
    <div class="inline-flex flex-row-reverse">
  
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
      <div class="flex flex-row">
        {#if $logged_in}
          <UserBar/>
        {/if}
        <slot />
      </div>
  </body>
  
</div>
