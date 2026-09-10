import type BlogPost from "@/interfaces/blogPost";

const RSS_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mattchw";

type RssItem = {
  title: string;
  description: string;
  link: string;
  thumbnail?: string;
  pubDate: string;
  categories?: string[];
};

function extractImage(html: string, fallback?: string) {
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match?.[1] || fallback || "";
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return [];
    }
    const data = (await res.json()) as { items?: RssItem[] };
    return (data.items ?? [])
      .filter((item) => (item.categories?.length ?? 0) > 0)
      .map((item) => ({
        title: item.title,
        description: item.description,
        link: item.link,
        thumbnail: extractImage(item.description, item.thumbnail),
        pubDate: item.pubDate,
        categories: item.categories ?? [],
      }));
  } catch {
    return [];
  }
}

export function excerptFromHtml(html: string, maxLength = 220) {
  return html
    .replace(/<figure>[\s\S]*?<\/figure>/g, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}
