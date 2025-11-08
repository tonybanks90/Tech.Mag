// ============================================
// CATEGORY TYPES
// ============================================

export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  banner?: string
  bannerAlt?: string
}

// ============================================
// BLOG POST TYPES
// ============================================

export interface BlogPostPreview {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  coverImageAlt: string
  category: {
    _id: string
    name: string
    slug: string
  }
  metaTitle: string
  metaDescription: string
  readTime: number
  publishedAt: string
  reactions: {
    likes: number
    bookmarks: number
  }
}

export interface BlogPost extends BlogPostPreview {
  content: any // Block content (Portable Text)
  category: {
    _id: string
    name: string
    slug: string
    description: string
  }
}

// ============================================
// PRODUCT TYPES
// ============================================

export interface Product {
  _id: string
  name: string
  image: string
  imageAlt: string
  description: string
  affiliateUrl: string
  price: string
  category: string
  featured?: boolean
}

// ============================================
// SITE SETTINGS TYPES
// ============================================

export interface HeroSection {
  image: string
  imageAlt: string
  heading: string
  subheading: string
}

export interface NewsletterSection {
  backgroundImage: string
  imageAlt: string
  heading: string
  description: string
  cta: string
}

export interface FooterData {
  about: {
    title: string
    content: string
  }
  contact: {
    title: string
    email: string
    socials: Array<{
      name: string
      url: string
      icon: string
    }>
  }
  links: Array<{
    name: string
    url: string
  }>
}

export interface SiteSettings {
  _id: string
  siteName: string
  heroSection: HeroSection
  newsletterSection: NewsletterSection
  footer: FooterData
}

// ============================================
// HOMEPAGE DATA TYPE
// ============================================

export interface HomepageData {
  siteSettings: SiteSettings
  featuredPosts: BlogPostPreview[]
  categories: Category[]
  featuredProducts: Product[]
}

// ============================================
// PAGINATION TYPES
// ============================================

export interface PaginationParams {
  start: number
  end: number
}

export interface SearchParams {
  searchTerm: string
}

export interface CategoryParams {
  categorySlug: string
}

export interface PostParams {
  slug: string
}

export interface RelatedPostsParams {
  categoryId: string
  postId: string
}

export interface LimitParams {
  limit: number
}