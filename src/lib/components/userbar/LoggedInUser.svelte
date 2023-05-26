<script>

import { bskyClient } from "$lib/bsky";
import { userData } from "$lib/stores";
import Icon from "$lib/user/Icon.svelte";

</script>

<div class=" rounded-2xl h-fit inline-flex flex-row text-slate-300 align-middle w-full ">
    <!-- ? Someone tell me this works correctly?? -->
    {#await bskyClient.getProfile({actor: $userData.handle}) then data}
    <Icon
        displayName={data.data.displayName}
        avatar={data.data.avatar}
        handle={data.data.handle}
    />
    <div class="inline-flex flex-col">
        <p class="text-base">{data.data.displayName}</p>
        <p class="bsky-handle ">{data.data.handle}</p>
        <!-- <p>Followers: {data.data.followersCount}</p>
        <p>Following: {data.data.followsCount}</p> -->
    </div>
    {/await}
</div>