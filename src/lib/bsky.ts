import { BskyAgent, RichText } from '@atproto/api'
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


export async function parseSkeet(record: any) {
    const rt = new RichText(record)
    await rt.detectFacets(bskyClient)
    
    let markdown = ''
    for (const segment of rt.segments()) {
        if (segment.isLink()) {
            markdown += `
            <a href="${segment.link?.uri}" class="text-slate-300 hover:text-indigo-400 underline" target="_blank">
                ${segment.text}
            </a>`
        } else if (segment.isMention()) {
            markdown += `
            <a href="profile/${segment.mention?.did}" class="text-slate-300 hover:text-indigo-400 underline">
                ${segment.text}
            </a>`            
        } else {
            markdown += segment.text
    }
    }
    
    return markdown
}