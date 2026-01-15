import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw } from 'lucide-react';
import { XMLParser } from 'fast-xml-parser';
import ShinyText from '@/components/ui/ShinyText';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  categories?: string[];
}

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  category: string | string[];
}

interface RSSChannel {
  item: RSSItem[];
}

interface RSSFeed {
  rss: {
    channel: RSSChannel;
  };
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cleanMarkdown = (text: string) => {
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*|\*|__|_/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/^[\s-]*[-*+]\s+/gm, '')
      .replace(/^>\s+/gm, '')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  };

  const fetchPosts = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get('https://www.jimmy-blog.top/rss.xml', {
        responseType: 'text'
      });
      
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_"
      });
      
      const result = parser.parse(response.data) as RSSFeed;
      const items = result.rss.channel.item;
      
      const fixedPosts = items
        .slice(0, 9)
        .map((item: RSSItem) => ({
          title: item.title,
          link: item.link.replace('jimmy-blog.vercel.app', 'www.jimmy-blog.top'),
          pubDate: item.pubDate,
          description: item.description,
          categories: Array.isArray(item.category) ? item.category : [item.category]
        }))
        .sort((a: BlogPost, b: BlogPost) => 
          new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );
      
      setPosts(fixedPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setError('获取博客文章失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="container max-w-6xl mx-auto px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold"><ShinyText text="最新博客" /></h2>
          <div className="animate-pulse bg-zinc-700 rounded-md h-9 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse rounded-3xl bg-card/50 backdrop-blur-xl border-zinc-600">
              <CardHeader className="pb-2">
                <div className="h-6 rounded bg-zinc-700 w-3/4"></div>
                <div className="h-4 rounded bg-zinc-700 w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-2">
                  <div className="h-4 rounded bg-zinc-700"></div>
                  <div className="h-4 rounded bg-zinc-700"></div>
                  <div className="h-4 rounded bg-zinc-700 w-5/6"></div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <div className="h-6 w-16 rounded-md bg-zinc-700"></div>
                  <div className="h-6 w-20 rounded-md bg-zinc-700"></div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="h-10 w-full rounded-md bg-zinc-700"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center">
          <div className="h-12 w-48 animate-pulse rounded-md bg-zinc-700 mx-auto" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center"><ShinyText text="最新博客" /></h2>
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={fetchPosts}
          >
            <RefreshCw className="h-4 w-4" />
            重试
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="container max-w-6xl mx-auto px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold"><ShinyText text="最新博客" /></h2>
        <Button 
          variant="ghost" 
          size="sm"
          className="gap-2"
          onClick={fetchPosts}
        >
          <RefreshCw className="h-4 w-4" />
          刷新
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Card key={index} className="hover:shadow-md transition-all duration-300 bg-card/50 backdrop-blur-xl border-zinc-600 rounded-3xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl md:truncate text-zinc-300">
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </a>
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                <span>{formatDate(post.pubDate)}</span>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-muted-foreground line-clamp-3 mb-2">
                {cleanMarkdown(post.description)}
              </p>
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, idx) => (
                    <span key={idx} className="border border-zinc-600 bg-zinc-700 px-3 py-1 rounded-full text-xs text-foreground hover:bg-zinc-800 hover:text-white transition-colors duration-300">
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full group border-zinc-600 rounded-full">
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  阅读全文
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-6 text-center">
        <a 
          href="https://www.jimmy-blog.top/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 text-primary/90 hover:from-primary/20 hover:via-primary/10 hover:to-primary/20 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm group"
        >
          <span>更多博客</span>
          <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}