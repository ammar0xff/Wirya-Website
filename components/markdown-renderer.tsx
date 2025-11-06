"use client"

import ReactMarkdown from "react-markdown"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                <code className={`${className} text-sm`} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            )
          },
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 text-foreground">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-8 text-foreground">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold mb-2 mt-6 text-foreground">{children}</h3>,
          p: ({ children }) => <p className="mb-4 text-foreground/80 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 text-foreground/80">{children}</ul>,
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground/80">{children}</ol>
          ),
          li: ({ children }) => <li className="ml-4">{children}</li>,
          a: ({ children, href }) => (
            <a href={href} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-foreground/70">{children}</blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
