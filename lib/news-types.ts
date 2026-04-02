export type NewsFrontmatter = {
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

export type NewsPostSummary = Omit<NewsPost, "content">;

export type PaginatedPosts = {
  posts: NewsPostSummary[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
