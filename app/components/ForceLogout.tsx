"use client"

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"

export default function ForceLogout() {
  const { data: session } = useSession();

  const handleForceLogout = () => {
    if (session) {
      // If user is logged in, perform proper logout
      signOut();
    } else {
      // If not logged in, just clear cookies and reload
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      window.location.reload();
    }
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