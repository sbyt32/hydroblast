<script lang="ts">
    import { bskyClient } from "$lib/bsky";
    import { page } from "$app/stores"
    import Icon from "$lib/user/Icon.svelte";
    import { userData } from "$lib/stores";
    import TimelinePost from "$lib/components/TimelinePost.svelte";
</script>

{#await bskyClient.getProfile({actor: $page.params.user}) then userData}        
        
        <div class="max-h-[calc(100vh-28px)] border-l-2 border-blue-700 grow overflow-x-auto">

            <div class="flex flex-col relative mb-2 border-blue-600 border-b-2 shadow-md shadow-gray-600">
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


            <div class="flex flex-col">
                {#await bskyClient.getAuthorFeed({actor: $page.params.user, limit: 30}) then userFeed}
                    {#each userFeed.data.feed as userPost}
                        <TimelinePost
                            avatar={userPost.post.author.avatar}
                            displayName={userPost.post.author.displayName}
                            text={userPost.post.record.text}
                            handle={userPost.post.author.handle}
                            reskeetedBy={userPost.reason?.by?.displayName}
                            reskeetedByIcon={userPost.reason?.by?.avatar}
                            reskeetedByHandle={userPost.reason?.by?.handle}
                            replySkeetData={
                                {
                                    avatar: userPost.reply?.parent?.author?.avatar,
                                    displayName: userPost.reply?.parent?.author?.displayName,
                                    text: userPost.reply?.parent?.record?.text,
                                    handle: userPost.reply?.parent?.author?.handle,
                                    images: userPost.reply?.parent.images
                                }
                            }
                            images={userPost.post.embed?.images}
                        />
                    {/each}
                {/await}
            </div>
        </div>    

    
{/await}``