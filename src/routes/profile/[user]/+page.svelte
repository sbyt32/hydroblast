<script lang="ts">
    import { bskyClient } from "$lib/bsky";
    import { page } from "$app/stores"
    import Icon from "$lib/user/Icon.svelte";
    import Timeline from "$lib/components/page/Timeline.svelte";
</script>

{#await bskyClient.getProfile({actor: $page.params.user}) then userData}        

        <div class="flex flex-col relative mb-2 border-blue-600 border-b-2 shadow-md shadow-gray-600 h-48">
            <img src={userData.data.banner} class="w-full h-48 object-cover opacity-70 select-none" alt="{userData.data.displayName}'s banner.">        
            <div class="absolute bottom-0">
                <span class="inline-flex flex-row bottom-0">
                    <Icon
                    avatar={userData.data.avatar}
                    handle={userData.data.handle}
                    displayName={userData.data.displayName}
                />
                    <span class="w-48 inline-flex flex-col text-sm bg-slate-800/40 rounded-lg text-slate-300 pl-2 gap-0.5">
                        <p class="text-lg -mb-1">{userData.data.displayName}</p>
                        <p class="bsky-handle ">{userData.data.handle}</p>
                        <p>Followers: {userData.data.followersCount}</p>
                        <p>Following: {userData.data.followsCount}</p>
                    </span>
                </span>
            </div>
            
        </div>


        <Timeline
            timelineType="userpost"
            DID={$page.params.user}
            hasBanner={true}
        />

{/await}