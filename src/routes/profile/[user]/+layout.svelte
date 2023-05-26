<script lang="ts">
import { currentRoute } from "$lib/stores";
import { page } from "$app/stores";
$currentRoute = `@${$page.params.user}`
</script>

<slot>
    
</slot>