import { BskyAgent } from '@atproto/api'
import { logged_in, userData } from './stores'
import type { AtpSessionEvent, AtpSessionData } from '@atproto/api'

export const bskyClient = new BskyAgent(
    {
        service: "https://bsky.social",
        persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {

        }
    }
)

export interface bskyCreds {
    identifier: string
    password: string
}

export async function bskyLogin(login:bskyCreds) {
        const hello = await bskyClient.login({...login})
        if (hello.success) {
            logged_in.update(() => true)
            const user = await bskyClient.getProfile({actor: hello.data.handle})
            if (user.data.avatar && user.data.displayName && user.data.handle) {
                userData.set({
                    avatar: user.data.avatar,
                    handle: user.data.handle,
                    displayName: user.data.displayName
                })    
            }
        }
}

