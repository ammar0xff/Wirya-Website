export interface GitHubSyncConfig {
  token: string
  owner: string
  repo: string
}

export interface SyncResult {
  success: boolean
  message: string
  sha?: string
}

export async function syncToGitHub(
  config: GitHubSyncConfig,
  filePath: string,
  content: string,
  commitMessage: string,
): Promise<SyncResult> {
  try {
    if (!config.token || !config.owner || !config.repo) {
      return { success: false, message: "GitHub configuration incomplete" }
    }

    // Get current file SHA for update
    let sha: string | undefined
    try {
      const getRes = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`, {
        headers: { Authorization: `Bearer ${config.token}` },
      })
      if (getRes.ok) {
        const data = await getRes.json()
        sha = data.sha
      }
    } catch (e) {
      // File doesn't exist yet
    }

    const encoder = new TextEncoder()
    const uint8Array = encoder.encode(content)
    let binaryString = ""
    for (let i = 0; i < uint8Array.length; i++) {
      binaryString += String.fromCharCode(uint8Array[i])
    }
    const encodedContent = btoa(binaryString)

    // Commit to GitHub
    const commitRes = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: commitMessage,
        content: encodedContent,
        sha,
      }),
    })

    if (!commitRes.ok) {
      return { success: false, message: `GitHub API error: ${commitRes.statusText}` }
    }

    const result = await commitRes.json()
    return { success: true, message: "Synced to GitHub", sha: result.commit.sha }
  } catch (error) {
    return { success: false, message: `Error: ${error instanceof Error ? error.message : "Unknown error"}` }
  }
}

export async function getGitHubConfig(): Promise<GitHubSyncConfig | null> {
  try {
    const stored = localStorage.getItem("github-sync-config")
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function saveGitHubConfig(config: GitHubSyncConfig): void {
  localStorage.setItem("github-sync-config", JSON.stringify(config))
}
