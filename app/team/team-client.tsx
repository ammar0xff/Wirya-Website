"use client"

import { useTheme } from "@/lib/theme-provider"
import { FadeIn } from "@/components/animations/fade-in"
import { ScaleOnScroll } from "@/components/animations/scale-on-scroll"
import { Card } from "@/components/ui/card"
import { Mail, Linkedin, Github } from "lucide-react"
import Image from "next/image"

interface TeamMember {
  id: string
  nameAr: string
  nameEn: string
  positionAr: string
  positionEn: string
  bio: string
  image?: string
  email?: string
  linkedin?: string
  github?: string
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    nameAr: "أحمد علي",
    nameEn: "Ahmed Ali",
    positionAr: "مؤسس ورئيس تنفيذي",
    positionEn: "Founder & CEO",
    bio: "قائد ذو رؤية استراتيجية مع خبرة 10 سنوات في مجال التحول الرقمي",
    image: "/professional-man.png",
    email: "ahmed@wirya.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "2",
    nameAr: "فاطمة محمد",
    nameEn: "Fatima Mohamed",
    positionAr: "مديرة التسويق",
    positionEn: "Marketing Director",
    bio: "متخصصة في التسويق الرقمي وبناء العلامات التجارية",
    image: "/professional-woman.png",
    email: "fatima@wirya.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "3",
    nameAr: "محمود حسن",
    nameEn: "Mahmoud Hassan",
    positionAr: "مدير التطوير",
    positionEn: "Development Manager",
    bio: "خبير في تطوير الحلول التقنية المبتكرة",
    image: "/professional-man.png",
    email: "mahmoud@wirya.com",
    github: "https://github.com",
  },
]

export default function TeamClient() {
  const { language } = useTheme()

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border/40 px-4 py-16 md:py-24">
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              {language === "ar" ? "فريقنا المتميز" : "Our Exceptional Team"}
            </h1>
            <p className="text-lg text-foreground/70">
              {language === "ar"
                ? "نخبة من الخبراء المتفانين في تقديم أفضل الحلول"
                : "A team of dedicated experts delivering exceptional solutions"}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Team Members Grid */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, idx) => (
              <ScaleOnScroll key={member.id} delay={idx * 100}>
                <Card className="border border-border/40 bg-card/50 overflow-hidden hover:border-accent/50 transition-colors">
                  {/* Member Image */}
                  <div className="relative h-64 w-full bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={language === "ar" ? member.nameAr : member.nameEn}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Member Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground">
                      {language === "ar" ? member.nameAr : member.nameEn}
                    </h3>
                    <p className="text-sm text-accent font-semibold mt-1">
                      {language === "ar" ? member.positionAr : member.positionEn}
                    </p>
                    <p className="text-sm text-foreground/70 mt-3">{member.bio}</p>

                    {/* Social Links */}
                    <div className="flex gap-3 mt-6">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-2 rounded-lg bg-foreground/10 text-foreground/60 hover:text-accent transition-colors"
                          title="Email"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-foreground/10 text-foreground/60 hover:text-accent transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-foreground/10 text-foreground/60 hover:text-accent transition-colors"
                          title="GitHub"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </ScaleOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
