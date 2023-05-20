<script>
  import { goto } from "$app/navigation";
  import { appWindow } from "@tauri-apps/api/window";
  import { logged_in } from "$lib/stores"
  import "../app.postcss";

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

  <div class="titlebar-button" id="titlebar-minimize">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
    src="https://api.iconify.design/mdi:window-minimize.svg"
    alt="minimize"
    on:click={() => appWindow.minimize()}
    />
  </div>

  <div class="titlebar-button" id="titlebar-maximize">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
      src="https://api.iconify.design/mdi:window-maximize.svg"
      alt="maximize"
      on:click={() => appWindow.toggleMaximize()}
    />
    </div>

</div>
<body class="mt-7">
    <slot />
</body>
