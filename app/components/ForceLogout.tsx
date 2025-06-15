"use client"

import { Button } from "@/components/ui/button"
// import { signOut, useSession } from "next-auth/react"

export default function ForceLogout() {
  // const { data: session } = useSession();

  const handleForceLogout = async () => {
    // First, log out if user is logged in
    // if (session) {
    //   await signOut({ redirect: false });
    // }

    // Then clear all cookies
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }

    // Clear any local storage items
    localStorage.clear();
    sessionStorage.clear();

    // Finally, reload the page
    window.location.reload();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-xs text-[#333] opacity-60 hover:opacity-100 transition-opacity"
      onClick={handleForceLogout}
    >
      Force Logout
    </Button>
  );
} 