import { supabaseAnon } from '@/lib/supabase';
import type { NewsPostSummary } from '@/lib/news-types';

/**
 * Cloudflare Function entry point – returns the latest 20 news items ordered by published_at DESC.
 */
export async function onRequest() {
  const { data, error } = await supabaseAnon
    .from<NewsPostSummary>('news')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Supabase fetch error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(data ?? []), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
