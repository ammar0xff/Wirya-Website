"use client"

import type React from "react"

import { useTheme } from "@/lib/theme-provider"
import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, File, ImageIcon, Trash2, Copy, Search, Grid, List } from "lucide-react"
import type { MediaFile } from "@/lib/site-content"

export default function AdminMedia() {
  const { language } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [files, setFiles] = useState<MediaFile[]>([])
  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<"all" | "image" | "document" | "video" | "audio">("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const saved = localStorage.getItem("media_library_data")
    if (saved) {
      const data = JSON.parse(saved)
      setFiles(data.files || [])
    }
  }, [mounted])

  useEffect(() => {
    // Extract all unique tags from files
    const tags = Array.from(new Set(files.flatMap((f) => f.tags)))
    setAllTags(tags)
  }, [files])

  useEffect(() => {
    // Filter files based on search and filters
    let filtered = files

    if (selectedFilter !== "all") {
      filtered = filtered.filter((f) => f.type === selectedFilter)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.altText.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((f) => selectedTags.some((tag) => f.tags.includes(tag)))
    }

    setFilteredFiles(filtered)
  }, [files, searchQuery, selectedFilter, selectedTags])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.currentTarget.files
    if (!selectedFiles) return

    Array.from(selectedFiles).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newFile: MediaFile = {
          id: Date.now().toString(),
          name: file.name,
          url: event.target?.result as string,
          type: file.type.startsWith("image")
            ? "image"
            : file.type.startsWith("video")
              ? "video"
              : file.type.startsWith("audio")
                ? "audio"
                : "document",
          mimeType: file.type,
          size: file.size,
          altText: "",
          tags: [],
          uploadedAt: new Date().toISOString(),
          usageCount: 0,
        }
        setFiles((prev) => [...prev, newFile])
      }
      reader.readAsDataURL(file)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDelete = (id: string) => {
    setFiles(files.filter((f) => f.id !== id))
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
  }

  const handleSave = () => {
    localStorage.setItem(
      "media_library_data",
      JSON.stringify({ files, totalSize: files.reduce((sum, f) => sum + f.size, 0) }),
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const getFileIcon = (type: MediaFile["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5" />
      case "video":
        return <File className="h-5 w-5" />
      case "audio":
        return <File className="h-5 w-5" />
      default:
        return <File className="h-5 w-5" />
    }
  }

  if (!mounted) return <div>{language === "ar" ? "جاري التحميل..." : "Loading..."}</div>

  return (
    <div className="pb-8 px-4 sm:px-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {language === "ar" ? "مكتبة الملفات" : "Media Library"}
        </h1>
        <p className="text-sm sm:text-base text-foreground/60">
          {language === "ar" ? "إدارة وتنظيم ملفاتك ووسائطك" : "Manage and organize your files and media"}
        </p>
      </div>

      {/* Upload Section */}
      <Card className="border border-border/40 bg-card/50 p-6 mb-6">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        />
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border/40 rounded-lg p-8 text-center hover:border-accent/50 hover:bg-card/50 transition-all cursor-pointer"
        >
          <Upload className="h-8 w-8 text-accent/60 mx-auto mb-3" />
          <p className="text-foreground font-medium">
            {language === "ar" ? "اسحب الملفات هنا أو انقر للتحميل" : "Drag files here or click to upload"}
          </p>
          <p className="text-sm text-foreground/60 mt-1">
            {language === "ar"
              ? "يدعم الصور والفيديو والصوت والمستندات"
              : "Supports images, video, audio, and documents"}
          </p>
        </div>
      </Card>

      {/* Search and Filter */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <div className="space-y-2">
          <Label>{language === "ar" ? "بحث" : "Search"}</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/60" />
            <Input
              placeholder={language === "ar" ? "ابحث عن الملفات..." : "Search files..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-input border-border pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>{language === "ar" ? "النوع" : "Type"}</Label>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as any)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
          >
            <option value="all">{language === "ar" ? "الكل" : "All"}</option>
            <option value="image">{language === "ar" ? "صور" : "Images"}</option>
            <option value="video">{language === "ar" ? "فيديو" : "Videos"}</option>
            <option value="audio">{language === "ar" ? "صوت" : "Audio"}</option>
            <option value="document">{language === "ar" ? "مستندات" : "Documents"}</option>
          </select>
        </div>
      </div>

      {/* View Mode Toggle and Stats */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-foreground/60">
          {language === "ar" ? `إجمالي الملفات: ${filteredFiles.length}` : `Total files: ${filteredFiles.length}`}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant={viewMode === "grid" ? "default" : "outline"} onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button size="sm" variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
          <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 text-white">
            {language === "ar" ? "حفظ" : "Save"}
          </Button>
        </div>
      </div>

      {/* Files Display */}
      {filteredFiles.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="border border-border/40 bg-card/50 p-4 group hover:border-accent/50">
                {file.type === "image" ? (
                  <img
                    src={file.url || "/placeholder.svg"}
                    alt={file.altText}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="w-full h-32 bg-card rounded-lg mb-3 flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                )}
                <p className="font-medium text-sm text-foreground truncate">{file.name}</p>
                <p className="text-xs text-foreground/60">{formatFileSize(file.size)}</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="ghost" onClick={() => handleCopyUrl(file.url)} className="flex-1 gap-1">
                    <Copy className="h-3 w-3" />
                    {language === "ar" ? "نسخ" : "Copy"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="px-2 text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="border border-border/40 bg-card/50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded bg-card">{getFileIcon(file.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-foreground/60">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleCopyUrl(file.url)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )
      ) : (
        <Card className="border border-border/40 bg-card/50 p-12 text-center">
          <ImageIcon className="h-12 w-12 text-foreground/20 mx-auto mb-3" />
          <p className="text-foreground/60">{language === "ar" ? "لا توجد ملفات" : "No files found"}</p>
        </Card>
      )}
    </div>
  )
}
