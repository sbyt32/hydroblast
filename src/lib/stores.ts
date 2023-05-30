import { writable } from 'svelte/store';
export const logged_in = writable(false)
export const refresh = writable(0)

export interface userDataType {
    avatar: string
    handle: string
    displayName: string
}
export const userData = writable(
    {
        avatar: "null",
        handle: "null",
        displayName: "null"
    }
)

export const currentRoute = writable("Home")

export const postSkeet = writable(false)
export const feedURI = writable("")