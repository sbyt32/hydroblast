<script lang="ts">
    import { bskyClient, parseSkeet } from "$lib/bsky";
    import { page } from "$app/stores"
    import Icon from "$lib/user/Icon.svelte";
    import Timeline from "$lib/components/page/Timeline.svelte";

    function parseUserDesc(description: string | undefined) {
        if (description) {
            let response = ""
            description.split('\n').forEach(e => {
                response += `<p class="">${e}</p>`
            });
            return response
        }
    }
</script>

{#await bskyClient.getProfile({actor: $page.params.user}) then userData}        

        <div class="flex flex-col relative border-blue-600 border-b-2  h-48">

            <!-- Banner -->
            <img src={userData.data.banner} class="w-full h-48 object-cover opacity-70 select-none" alt="{userData.data.displayName}'s banner.">

            <!-- User -->
            <div class="absolute bottom-0">
                <span class="inline-flex flex-row bottom-0 w-full">
                    <Icon
                    avatar={userData.data.avatar}
                    handle={userData.data.handle}
                    displayName={userData.data.displayName}
                />
                    <span class="w-96 inline-flex flex-col text-sm from-slate-900/70 via-slate-800/70 bg-gradient-to-r rounded-lg text-slate-300 pl-2 gap-0.5 my-2 py-1">
                        <p class="text-lg -mb-1">{userData.data.displayName}</p>
                        <p class="bsky-handle ">{userData.data.handle}</p>
                        <span class="flex-row inline-flex gap-4">
                            <p>Followers: {userData.data.followersCount}</p>
                            <p>Following: {userData.data.followsCount}</p>    
                        </span>
                    </span>

                </span>

            </div>
            
        </div>

        <Timeline
            feedData={{ feedType:"userpost", did: $page.params.user }}
            hasBanner={true}
        >
        <div class="inline-flex flex-col px-4 w-full leading-snug py-2 shadow-lg shadow-gray-600">
                {@html parseUserDesc(userData.data.description)}
            <!-- <div class="inline-flex flex-col border-b mx-12 py-2"/> -->
        </div>
        </Timeline>

{/await}