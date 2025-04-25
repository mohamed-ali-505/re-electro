"use server";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

const cookieOptions = {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
};

export async function setMeInCookie(token: string) {
    const cookieStore = await cookies()
    cookieStore.set('me', token, cookieOptions)
}

export async function getMeInCookie() {
    const cookieStore = await cookies()

    const me = cookieStore.get('me')?.value

    if (!me) {
        return null
    }

    return JSON.parse(me)
}

export async function removeMeFromCookie() {
    const cookieStore = await cookies()

    cookieStore.delete('me')
    cookieStore.delete('token')
}

export async function setTokenInCookie(token: string) {
    const cookieStore = await cookies()
    cookieStore.set('token', token, cookieOptions)
}

export async function getTokenFromCookie() {
    const cookieStore = await cookies()

    return cookieStore.get('token')?.value
}

export async function removeTokenFromCookie() {
    const cookieStore = await cookies()

    cookieStore.delete('token')
}

export async function getSidebarStateFromCookie() {
    const cookieStore = await cookies()

    return cookieStore.get('sidebar_state')?.value
}

export async function handleLogout() {
    const cookieStore = await cookies()

    cookieStore.delete('token')
    cookieStore.delete('me')


    return redirect('/')
}
