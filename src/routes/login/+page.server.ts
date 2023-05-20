// import type { Actions } from "./$types";
// import { bskyClient } from "$lib/bsky";
// import { goto } from "$app/navigation";

// export const actions = {
//     login: async (event) => {
//         const data = await event.formData()
//         console.log(data)
//         await bskyClient.login({
//             identifier: data.get('ID'),
//             password: data.get('Password')
//         })
//         goto('/')
//     }
// } satisfies Actions