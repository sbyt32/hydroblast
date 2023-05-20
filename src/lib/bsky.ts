import { BskyAgent } from '@atproto/api'
import type { AtpSessionEvent, AtpSessionData } from '@atproto/api'

export const bskyClient = new BskyAgent(
    {
        service: "https://bsky.social",
        // persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {

        // }
    }
)

export interface bskyCreds {
    identifier: string
    password: string
}

export async function bskyLogin(login:bskyCreds) {
    try {
        await bskyClient.login({...login})
    }
    catch {
        throw new Error('not logged in')
    }
}

