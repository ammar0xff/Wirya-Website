"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GitBranch, Loader } from "lucide-react"
import { getGitHubConfig, syncToGitHub } from "@/lib/github-sync"

interface GitHubSyncButtonProps {
  filePath: string
  content: string
  commitMessage: string
  label?: string
}

export function GitHubSyncButton({
  filePath,
  content,
  commitMessage,
  label = "Sync to GitHub",
}: GitHubSyncButtonProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSync = async () => {
    setLoading(true)
    try {
      const config = await getGitHubConfig()
      if (!config?.token) {
        setMessage("Please configure GitHub settings first")
        return
      }

      const result = await syncToGitHub(config, filePath, content, commitMessage)
      setMessage(result.message)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Sync failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleSync}
        disabled={loading}
        variant="outline"
        className="gap-2 text-accent hover:text-accent/80 bg-transparent"
      >
        {loading ? <Loader className="h-4 w-4 animate-spin" /> : <GitBranch className="h-4 w-4" />}
        {label}
      </Button>
      {message && <p className="text-xs text-foreground/60">{message}</p>}
    </div>
  )
}
