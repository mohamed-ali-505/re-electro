"use client"
// context provider

import { getRole, getUserId } from "@/actions/cookies";
import { createContext, useContext, useEffect, useState } from "react";

// context
type AuthContextType = {
    session: {
        id: string;
        role: string;
    } | null;
    setSession: React.Dispatch<React.SetStateAction<any>>;
} | null;

export const AuthContext = createContext<AuthContextType>(null);

// provider
import { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<{ id: string; role: string } | null>(null);
    const [loading, setLoading] = useState(true);

    const getSession = async () => {
        const id = await getUserId();
        const role = await getRole();
        if (id && role) {
            setSession({
                id,
                role,
            });
        }
    };

    useEffect(() => {
        getSession();

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ session, setSession }}>
            {children}
        </AuthContext.Provider>
    );
}

// hook
export const useAuth = () => useContext(AuthContext);