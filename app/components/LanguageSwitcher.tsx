"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("EN")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "AR" : "EN"))
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="text-gray-900 bg-white border-gray-200 hover:bg-gray-100 font-medium"
    >
      <Globe className="h-5 w-5 mr-2" />
      {language === "EN" ? "العربية" : "English"}
    </Button>
  )
}

