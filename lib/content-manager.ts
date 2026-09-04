import type { BlogPost } from "./blog-loader"
import type { BlogCategory } from "./blog"
import type { Service, ServiceCategory } from "./services"
import type {
  AboutPageContent,
  ContactPageContent,
  OurStoryContent,
  FooterContent,
  SiteSettings,
  FAQ,
} from "./site-content"
import { blogCategories as DEFAULT_BLOG_CATEGORIES } from "./blog"

export interface ContentState {
  blogPosts: BlogPost[]
  blogCategories: BlogCategory[]
  services: Service[]
  serviceCategories: ServiceCategory[]
  aboutContent: AboutPageContent | null
  contactContent: ContactPageContent | null
  storyContent: OurStoryContent | null
  footerContent: FooterContent | null
  siteSettings: SiteSettings | null
  faqs: FAQ[]
  lastSync: string | null
  isDirty: boolean
}

function getDefaultState(): ContentState {
  return {
    blogPosts: [],
    blogCategories: [...DEFAULT_BLOG_CATEGORIES], // initialize with default blog categories
    services: [],
    serviceCategories: [],
    aboutContent: null,
    contactContent: null,
    storyContent: null,
    footerContent: null,
    siteSettings: null,
    faqs: [],
    lastSync: null,
    isDirty: false,
  }
}

export class ContentManager {
  private static instance: ContentManager
  private state: ContentState = getDefaultState()
  private listeners: Set<() => void> = new Set()
  private hydrated = false

  private constructor() {
    // Loading will happen via loadFromStorage() method called after mount
  }

  static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager()
    }
    return ContentManager.instance
  }

  loadFromStorage() {
    if (this.hydrated || typeof window === "undefined") {
      return
    }

    const stored = localStorage.getItem("content-state")
    if (stored) {
      try {
        const loadedState = JSON.parse(stored)
        this.state = {
          ...getDefaultState(),
          ...loadedState,
          // Ensure arrays are always arrays, never undefined
          blogPosts: Array.isArray(loadedState.blogPosts) ? loadedState.blogPosts : [],
          blogCategories: Array.isArray(loadedState.blogCategories) ? loadedState.blogCategories : [],
          services: Array.isArray(loadedState.services) ? loadedState.services : [],
          serviceCategories: Array.isArray(loadedState.serviceCategories) ? loadedState.serviceCategories : [],
        }
        console.log("[v0] ContentManager: Loaded state from localStorage", this.state)
      } catch (e) {
        console.error("[v0] Failed to load content state:", e)
        this.state = getDefaultState()
      }
    }

    this.hydrated = true
    this.notify()
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach((listener) => listener())
    this.saveToLocalStorage()
  }

  private saveToLocalStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem("content-state", JSON.stringify(this.state))
      console.log("[v0] ContentManager: Saved state to localStorage")
    }
  }

  getState(): ContentState {
    return { ...this.state }
  }

  setAboutContent(content: AboutPageContent) {
    this.state.aboutContent = content
    this.state.isDirty = true
    console.log("[v0] ContentManager: About content updated")
    this.notify()
  }

  setContactContent(content: ContactPageContent) {
    this.state.contactContent = content
    this.state.isDirty = true
    console.log("[v0] ContentManager: Contact content updated")
    this.notify()
  }

  setStoryContent(content: OurStoryContent) {
    this.state.storyContent = content
    this.state.isDirty = true
    console.log("[v0] ContentManager: Story content updated")
    this.notify()
  }

  setFooterContent(content: FooterContent) {
    this.state.footerContent = content
    this.state.isDirty = true
    console.log("[v0] ContentManager: Footer content updated")
    this.notify()
  }

  setSiteSettings(settings: SiteSettings) {
    this.state.siteSettings = settings
    this.state.isDirty = true
    console.log("[v0] ContentManager: Site settings updated")
    this.notify()
  }

  setFaqs(faqs: FAQ[]) {
    this.state.faqs = faqs
    this.state.isDirty = true
    console.log("[v0] ContentManager: FAQs updated")
    this.notify()
  }

  setBlogPosts(posts: BlogPost[]) {
    this.state.blogPosts = posts
    this.state.isDirty = true
    console.log("[v0] ContentManager: Blog posts updated")
    this.notify()
  }

  setServices(services: Service[]) {
    this.state.services = services
    this.state.isDirty = true
    console.log("[v0] ContentManager: Services updated")
    this.notify()
  }

  setServiceCategories(categories: ServiceCategory[]) {
    this.state.serviceCategories = categories
    this.state.isDirty = true
    console.log("[v0] ContentManager: Service categories updated")
    this.notify()
  }

  addBlogPost(post: BlogPost) {
    this.state.blogPosts = [...this.state.blogPosts, post]
    this.state.isDirty = true
    this.notify()
  }

  updateBlogPost(id: string, post: Partial<BlogPost>) {
    this.state.blogPosts = this.state.blogPosts.map((p) => (p.id === id ? { ...p, ...post } : p))
    this.state.isDirty = true
    this.notify()
  }

  deleteBlogPost(id: string) {
    this.state.blogPosts = this.state.blogPosts.filter((p) => p.id !== id)
    this.state.isDirty = true
    this.notify()
  }

  addService(service: Service) {
    this.state.services = [...this.state.services, service]
    this.state.isDirty = true
    this.notify()
  }

  updateService(id: string, service: Partial<Service>) {
    this.state.services = this.state.services.map((s) => (s.id === id ? { ...s, ...service } : s))
    this.state.isDirty = true
    this.notify()
  }

  deleteService(id: string) {
    this.state.services = this.state.services.filter((s) => s.id !== id)
    this.state.isDirty = true
    this.notify()
  }

  addServiceCategory(category: ServiceCategory) {
    this.state.serviceCategories = [...this.state.serviceCategories, category]
    this.state.isDirty = true
    this.notify()
  }

  updateServiceCategory(id: string, category: Partial<ServiceCategory>) {
    this.state.serviceCategories = this.state.serviceCategories.map((c) => (c.id === id ? { ...c, ...category } : c))
    this.state.isDirty = true
    this.notify()
  }

  deleteServiceCategory(id: string) {
    this.state.serviceCategories = this.state.serviceCategories.filter((c) => c.id !== id)
    this.state.isDirty = true
    this.notify()
  }

  setBlogCategories(categories: BlogCategory[]) {
    this.state.blogCategories = categories
    this.state.isDirty = true
    console.log("[v0] ContentManager: Blog categories updated")
    this.notify()
  }

  addBlogCategory(category: BlogCategory) {
    this.state.blogCategories = [...this.state.blogCategories, category]
    this.state.isDirty = true
    this.notify()
  }

  updateBlogCategory(id: string, category: Partial<BlogCategory>) {
    this.state.blogCategories = this.state.blogCategories.map((c) => (c.id === id ? { ...c, ...category } : c))
    this.state.isDirty = true
    this.notify()
  }

  deleteBlogCategory(id: string) {
    this.state.blogCategories = this.state.blogCategories.filter((c) => c.id !== id)
    this.state.isDirty = true
    this.notify()
  }

  markSynced() {
    this.state.lastSync = new Date().toISOString()
    this.state.isDirty = false
    console.log("[v0] ContentManager: Marked as synced")
    this.notify()
  }

  hasDirtyContent(): boolean {
    return this.state.isDirty
  }

  hasContent(): boolean {
    return (
      this.state.blogPosts.length > 0 ||
      this.state.blogCategories.length > 0 ||
      this.state.services.length > 0 ||
      this.state.serviceCategories.length > 0 ||
      this.state.aboutContent !== null ||
      this.state.contactContent !== null ||
      this.state.storyContent !== null ||
      this.state.footerContent !== null ||
      this.state.siteSettings !== null
    )
  }

  reset() {
    this.state = getDefaultState()
    this.notify()
  }
}
