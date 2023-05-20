<script lang="ts">
  import { goto } from "$app/navigation";
  import { invoke } from "@tauri-apps/api/tauri";
  import { appWindow } from "@tauri-apps/api/window";
  import { logged_in } from "$lib/stores"
  import "../app.postcss";


  async function titleName(route:string) {
    return await invoke('titlebar_name', {route})
  }
</script>

<div data-tauri-drag-region class="titlebar">

  {#if $logged_in}
    <div class="titlebar-button" id="titlebar-home">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        src="https://api.iconify.design/mdi-light/home.svg"
        alt="Home"
        on:click={() => {goto('/')}}
      />
    </div>    
  {/if}

  <div class="text-white text-center text-sm pt-0.5 grow" data-tauri-drag-region>
    {#await titleName('N/A') then data}
      {data}
    {/await}
  </div>


  <div class="inline-flex flex-row-reverse">

    <div class="titlebar-button" id="titlebar-maximize">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        src="https://api.iconify.design/mdi:window-maximize.svg"
        alt="maximize"
        on:click={() => appWindow.toggleMaximize()}
      />
      </div>

      <div class="titlebar-button" id="titlebar-minimize">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
        src="https://api.iconify.design/mdi:window-minimize.svg"
        alt="minimize"
        on:click={() => appWindow.minimize()}
        />
      </div>

  </div>

</div>


<body class="mt-7">
    <slot />
</body>
