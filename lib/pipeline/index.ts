import { fetchAll } from '@/lib/pipeline/fetch';
import { filterItems } from '@/lib/pipeline/filter';
import { normalizeItems } from '@/lib/pipeline/normalize';
import { storePosts } from '@/lib/pipeline/store';

export async function runPipeline() {
  console.log('🚀 Starting news pipeline');
  const raw = await fetchAll();
  console.log(`Fetched ${raw.length} items`);
  const filtered = filterItems(raw);
  console.log(`Filtered down to ${filtered.length} items`);
  const normalized = normalizeItems(filtered);
  console.log(`Normalized ${normalized.length} items`);
  await storePosts(normalized);
  console.log('✅ Pipeline completed');
}

if (require.main === module) {
  runPipeline().catch((err) => {
    console.error('Pipeline failed:', err);
    process.exit(1);
  });
}
