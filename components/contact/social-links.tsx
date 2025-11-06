"use client"

interface SocialLink {
  name: string
  icon: any
  url: string
  color: string
}

interface SocialLinksProps {
  title: string
  links: SocialLink[]
}

export function SocialLinks({ title, links }: SocialLinksProps) {
  return (
    <section className="border-t border-border px-4 py-16 md:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">{title}</h2>
        <div className="flex justify-center gap-8">
          {links.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-foreground/60 transition-colors ${social.color}`}
                aria-label={social.name}
              >
                <Icon className="h-8 w-8" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
