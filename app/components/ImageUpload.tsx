'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { ImagePlus, X } from 'lucide-react'

interface ImageUploadProps {
  onImageUpload: (file: File | null) => void
}

export function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageUpload(file)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onImageUpload(null)
  }

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      {preview ? (
        <div className="relative w-full h-24">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover rounded-md" />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            aria-label="Remove image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="w-full h-24 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImagePlus className="w-8 h-8 mb-1" />
          <span>Add Image</span>
        </Button>
      )}
    </div>
  )
}

