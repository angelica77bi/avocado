export type NewsFrontmatter = {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  source?: string; // added source field
  title: string;
  date: string;
  category: string;
  excerpt: string;
  featuredImage: string;
};

export type NewsPost = NewsFrontmatter & {
  slug: string;
  content: string;
};
  slug: string;
  content: string;
};

export type NewsPostSummary = Omit<NewsPost, "content"> & {
  url: string;
  published_at: string;
};

export type PaginatedPosts = {
  posts: NewsPostSummary[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
  posts: NewsPostSummary[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

// New type for raw pipeline items (before storage)
export type NewsItem = {
  title: string;
  url: string;
  source: string;
  published_at: string; // ISO 8601 UTC
  summary: string;
  featuredImage: string;
};
