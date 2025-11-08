import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { sanityFetch } from './sanity'
import * as queries from './queries'
import type {
  Category,
  BlogPost,
  BlogPostPreview,
  Product,
  SiteSettings,
  HomepageData,
  HeroSection,
  NewsletterSection,
  FooterData,
} from './types'

// ============================================
// CATEGORY HOOKS
// ============================================

/**
 * Fetch all categories
 */
export function useCategories(): UseQueryResult<Category[], Error> {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => sanityFetch<Category[]>(queries.CATEGORIES_QUERY),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Fetch single category by slug
 */
export function useCategoryBySlug(slug: string): UseQueryResult<Category, Error> {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => sanityFetch<Category>(queries.CATEGORY_BY_SLUG_QUERY, { slug }),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  })
}

// ============================================
// BLOG POST HOOKS
// ============================================

/**
 * Fetch all blog posts
 */
export function useBlogPosts(): UseQueryResult<BlogPostPreview[], Error> {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: () => sanityFetch<BlogPostPreview[]>(queries.BLOG_POSTS_QUERY),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

/**
 * Fetch paginated blog posts
 */
export function usePaginatedBlogPosts(
  start: number,
  end: number
): UseQueryResult<BlogPostPreview[], Error> {
  return useQuery({
    queryKey: ['blogPosts', 'paginated', start, end],
    queryFn: () =>
      sanityFetch<BlogPostPreview[]>(queries.PAGINATED_BLOG_POSTS_QUERY, { start, end }),
    staleTime: 1000 * 60 * 2,
  })
}

/**
 * Fetch blog posts by category
 */
export function useBlogPostsByCategory(
  categorySlug: string
): UseQueryResult<BlogPostPreview[], Error> {
  return useQuery({
    queryKey: ['blogPosts', 'category', categorySlug],
    queryFn: () =>
      sanityFetch<BlogPostPreview[]>(queries.BLOG_POSTS_BY_CATEGORY_QUERY, { categorySlug }),
    enabled: !!categorySlug,
    staleTime: 1000 * 60 * 2,
  })
}

/**
 * Fetch single blog post by slug
 */
export function useBlogPostBySlug(slug: string): UseQueryResult<BlogPost, Error> {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => sanityFetch<BlogPost>(queries.BLOG_POST_BY_SLUG_QUERY, { slug }),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * Fetch featured/recent blog posts
 */
export function useFeaturedBlogPosts(limit: number = 6): UseQueryResult<BlogPostPreview[], Error> {
  return useQuery({
    queryKey: ['blogPosts', 'featured', limit],
    queryFn: () => sanityFetch<BlogPostPreview[]>(queries.FEATURED_BLOG_POSTS_QUERY, { limit }),
    staleTime: 1000 * 60 * 2,
  })
}

/**
 * Fetch related blog posts
 */
export function useRelatedBlogPosts(
  categoryId: string,
  postId: string
): UseQueryResult<BlogPostPreview[], Error> {
  return useQuery({
    queryKey: ['blogPosts', 'related', categoryId, postId],
    queryFn: () =>
      sanityFetch<BlogPostPreview[]>(queries.RELATED_BLOG_POSTS_QUERY, { categoryId, postId }),
    enabled: !!categoryId && !!postId,
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * Search blog posts
 */
export function useSearchBlogPosts(searchTerm: string): UseQueryResult<BlogPostPreview[], Error> {
  return useQuery({
    queryKey: ['blogPosts', 'search', searchTerm],
    queryFn: () =>
      sanityFetch<BlogPostPreview[]>(queries.SEARCH_BLOG_POSTS_QUERY, {
        searchTerm: `*${searchTerm}*`,
      }),
    enabled: searchTerm.length > 2,
    staleTime: 1000 * 30, // 30 seconds for search results
  })
}

// ============================================
// PRODUCT HOOKS
// ============================================

/**
 * Fetch all products
 */
export function useProducts(): UseQueryResult<Product[], Error> {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => sanityFetch<Product[]>(queries.PRODUCTS_QUERY),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

/**
 * Fetch featured products
 */
export function useFeaturedProducts(): UseQueryResult<Product[], Error> {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => sanityFetch<Product[]>(queries.FEATURED_PRODUCTS_QUERY),
    staleTime: 1000 * 60 * 10,
  })
}

/**
 * Fetch products by category
 */
export function useProductsByCategory(category: string): UseQueryResult<Product[], Error> {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => sanityFetch<Product[]>(queries.PRODUCTS_BY_CATEGORY_QUERY, { category }),
    enabled: !!category,
    staleTime: 1000 * 60 * 10,
  })
}

/**
 * Fetch limited number of products
 */
export function useLimitedProducts(limit: number = 8): UseQueryResult<Product[], Error> {
  return useQuery({
    queryKey: ['products', 'limited', limit],
    queryFn: () => sanityFetch<Product[]>(queries.LIMITED_PRODUCTS_QUERY, { limit }),
    staleTime: 1000 * 60 * 10,
  })
}

// ============================================
// SITE SETTINGS HOOKS
// ============================================

/**
 * Fetch site settings
 */
export function useSiteSettings(): UseQueryResult<SiteSettings, Error> {
  return useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => sanityFetch<SiteSettings>(queries.SITE_SETTINGS_QUERY),
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}

/**
 * Fetch hero section
 */
export function useHeroSection(): UseQueryResult<HeroSection, Error> {
  return useQuery({
    queryKey: ['heroSection'],
    queryFn: () => sanityFetch<HeroSection>(queries.HERO_SECTION_QUERY),
    staleTime: 1000 * 60 * 60,
  })
}

/**
 * Fetch newsletter section
 */
export function useNewsletterSection(): UseQueryResult<NewsletterSection, Error> {
  return useQuery({
    queryKey: ['newsletterSection'],
    queryFn: () => sanityFetch<NewsletterSection>(queries.NEWSLETTER_SECTION_QUERY),
    staleTime: 1000 * 60 * 60,
  })
}

/**
 * Fetch footer data
 */
export function useFooterData(): UseQueryResult<FooterData, Error> {
  return useQuery({
    queryKey: ['footerData'],
    queryFn: () => sanityFetch<FooterData>(queries.FOOTER_DATA_QUERY),
    staleTime: 1000 * 60 * 60,
  })
}

// ============================================
// COMBINED HOOKS
// ============================================

/**
 * Fetch all homepage data in a single query
 */
export function useHomepageData(): UseQueryResult<HomepageData, Error> {
  return useQuery({
    queryKey: ['homepage'],
    queryFn: () => sanityFetch<HomepageData>(queries.HOMEPAGE_QUERY),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Get blog post count
 */
export function useBlogPostCount(): UseQueryResult<number, Error> {
  return useQuery({
    queryKey: ['blogPostCount'],
    queryFn: () => sanityFetch<number>(queries.BLOG_POST_COUNT_QUERY),
    staleTime: 1000 * 60 * 5,
  })
}

/**
 * Get blog post count by category
 */
export function useBlogPostCountByCategory(categorySlug: string): UseQueryResult<number, Error> {
  return useQuery({
    queryKey: ['blogPostCount', 'category', categorySlug],
    queryFn: () =>
      sanityFetch<number>(queries.BLOG_POST_COUNT_BY_CATEGORY_QUERY, { categorySlug }),
    enabled: !!categorySlug,
    staleTime: 1000 * 60 * 5,
  })
}