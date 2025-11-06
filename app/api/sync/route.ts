import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { filePath, content, commitMessage } = await request.json()

    // Validate environment variables
    const token = process.env.GITHUB_TOKEN
    const owner = process.env.GITHUB_OWNER
    const repo = process.env.GITHUB_REPO

    if (!token || !owner || !repo) {
      return NextResponse.json(
        { success: false, message: "GitHub configuration missing. Please set environment variables." },
        { status: 500 },
      )
    }

    // Get current file SHA for update
    let sha: string | undefined
    try {
      const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      })
      if (getRes.ok) {
        const data = await getRes.json()
        sha = data.sha
      }
    } catch (e) {
      console.log("[v0] File doesn't exist yet, will create new file")
    }

    // Encode content to base64
    const encodedContent = Buffer.from(content, "utf-8").toString("base64")

    // Commit to GitHub
    const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: commitMessage,
        content: encodedContent,
        sha,
        branch: "main",
      }),
    })

    if (!commitRes.ok) {
      const error = await commitRes.text()
      console.error("[v0] GitHub API error:", error)
      return NextResponse.json(
        { success: false, message: `GitHub API error: ${commitRes.statusText}` },
        { status: commitRes.status },
      )
    }

    const result = await commitRes.json()
    return NextResponse.json({
      success: true,
      message: "Synced to GitHub successfully",
      sha: result.commit.sha,
    })
  } catch (error) {
    console.error("[v0] Sync error:", error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
