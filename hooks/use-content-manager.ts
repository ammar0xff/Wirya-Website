"use client"

import { useState, useEffect } from "react"
import { ContentManager } from "@/lib/content-manager"
import type { ContentState } from "@/lib/content-manager"

export function useContentManager() {
  const [state, setState] = useState<ContentState>(() => ContentManager.getInstance().getState())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const manager = ContentManager.getInstance()
    manager.loadFromStorage()
    setMounted(true)

    const unsubscribe = manager.subscribe(() => {
      setState(manager.getState())
    })
    return unsubscribe
  }, [])

  return {
    state,
    manager: ContentManager.getInstance(),
    mounted,
  }
}
