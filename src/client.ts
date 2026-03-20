/**
 * FontFYI API client — TypeScript wrapper for fontfyi.com REST API.
 *
 * Zero dependencies. Uses native `fetch`.
 *
 * @example
 * ```ts
 * import { FontFYI } from "fontfyi";
 * const api = new FontFYI();
 * const items = await api.search("query");
 * ```
 */

/** Generic API response type. */
export interface ApiResponse {
  [key: string]: unknown;
}

export class FontFYI {
  private baseUrl: string;

  constructor(baseUrl = "https://fontfyi.com") {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  private async get<T = ApiResponse>(
    path: string,
    params?: Record<string, string>,
  ): Promise<T> {
    const url = new URL(path, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<T>;
  }

  // -- Endpoints ----------------------------------------------------------

  /** List all blog categories. */
  async listBlogCategories(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/blog-categories/", params);
  }

  /** Get blog category by slug. */
  async getBlogCategory(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/blog-categories/${slug}/`);
  }

  /** List all blog posts. */
  async listBlogPosts(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/blog-posts/", params);
  }

  /** Get blog post by slug. */
  async getBlogPost(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/blog-posts/${slug}/`);
  }

  /** List all blog series. */
  async listBlogSeries(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/blog-series/", params);
  }

  /** Get blog sery by slug. */
  async getBlogSery(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/blog-series/${slug}/`);
  }

  /** List all faqs. */
  async listFaqs(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/faqs/", params);
  }

  /** Get faq by slug. */
  async getFaq(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/faqs/${slug}/`);
  }

  /** List all fonts. */
  async listFonts(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/fonts/", params);
  }

  /** Get font by slug. */
  async getFont(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/fonts/${slug}/`);
  }

  /** List all glossary. */
  async listGlossary(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/glossary/", params);
  }

  /** Get term by slug. */
  async getTerm(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/glossary/${slug}/`);
  }

  /** List all pairings. */
  async listPairings(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/pairings/", params);
  }

  /** Get pairing by slug. */
  async getPairing(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/pairings/${slug}/`);
  }

  /** List all tags. */
  async listTags(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/tags/", params);
  }

  /** Get tag by slug. */
  async getTag(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/tags/${slug}/`);
  }

  /** Search across all content. */
  async search(query: string, params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/search/", { q: query, ...params });
  }
}
