import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Tag, RefreshCw } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  categories?: string[];
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(
        'https://api.rss2json.com/v1/api.json?rss_url=https://www.jimmy-blog.top/rss.xml'
      );
      if (response.data.status === 'ok') {
        const fixedPosts = response.data.items
          .slice(0, 9)  
          .map((post: BlogPost) => ({
            ...post,
            link: post.link.replace('jimmy-blog.vercel.app', 'www.jimmy-blog.top')
          }));
        setPosts(fixedPosts);
      } else {
        setError('获取博客文章失败');
      }
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
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">最新博客文章</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-24 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">最新博客文章</h2>
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
    <section className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">最新博客文章</h2>
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
          <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="line-clamp-2 text-xl">
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
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.pubDate)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-3 mb-4">
                {post.description.replace(/<[^>]*>/g, '')}
              </p>
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.slice(0, 3).map((category, idx) => (
                    <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full group">
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  阅读全文
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button 
          variant="outline" 
          size="lg"
          className="gap-2 group"
          asChild
        >
          <a 
            href="https://www.jimmy-blog.top/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            查看更多文章
            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>
    </section>
  );
} 