import type { NewsItem, NewsPostSummary } from '@/lib/news-types';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * Store normalized posts into Supabase.
 * Uses `upsert` with `onConflict: 'url'` to deduplicate.
 */
export async function storePosts(posts: NewsPostSummary[]): Promise<void> {
  if (posts.length === 0) return;
  // Supabase table name assumed to be 'news'
  const { error } = await supabaseAdmin.from('news').upsert(posts, {
    onConflict: 'url', // column name in the table
    ignoreDuplicates: true,
  });
  if (error) {
    console.error('Failed to store posts:', error);
  } else {
    console.log(`Stored ${posts.length} posts (deduplication applied).`);
  }
}
