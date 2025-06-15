"use server";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getUserId = async () => {
    const cookieStore = cookies();
    const id = cookieStore.get('id');
    return id?.value;
};

export const getRole = async () => {
    const cookieStore = cookies();
    const role = cookieStore.get('role');
    return role?.value;
};


export async function handleLogout() {
    const cookieStore = cookies()

    cookieStore.delete('id')
    cookieStore.delete('role')


    return redirect('/')
}
