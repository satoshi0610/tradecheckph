import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const staticPaths = [
  '/',
  '/guides/',
  '/broker-reviews/',
  '/prop-firms/',
  '/tools/broker-checklist/',
  '/about/',
];

export const GET: APIRoute = async ({ site }) => {
  const guides = await getCollection('guides', ({ data }) => !data.draft);
  const base = site?.toString().replace(/\/$/, '') ?? 'https://tradecheckph.com';

  const guidePaths = guides.map((guide) => `/guides/${guide.id}/`);
  const allPaths = [...staticPaths, ...guidePaths];

  const urlEntries = allPaths
    .map((path) => `  <url><loc>${base}${path}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
