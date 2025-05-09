import { Github, Linkedin, Mail, Twitter, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function ContactSection() {
  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: 'https://github.com/yourusername',
      label: 'GitHub',
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: 'https://linkedin.com/in/yourusername',
      label: 'LinkedIn',
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      href: 'https://twitter.com/yourusername',
      label: 'Twitter',
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: 'mailto:your.email@example.com',
      label: 'Email',
    },
    {
      icon: <Globe className="h-5 w-5" />,
      href: 'https://your-website.com',
      label: 'Website',
    },
  ];

  return (
    <section id="contact" className="scroll-mt-16 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">联系方式</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          无论您是想讨论项目合作、技术咨询，还是单纯想交流技术话题，都欢迎随时联系我。
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">让我们开始合作</h3>
              <p className="text-muted-foreground">
                我很乐意听取新项目和机会的建议。无论是全职机会、自由职业项目还是技术咨询，
                都欢迎与我联系。
              </p>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a href="mailto:your.email@example.com" className="hover:underline">
                    your.email@example.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <a href="https://your-website.com" className="hover:underline" target="_blank" rel="noopener noreferrer">
                    your-website.com
                  </a>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">社交媒体</h3>
              <p className="text-muted-foreground">
                关注我的社交媒体账号，获取更多技术分享和项目更新。
              </p>
              <Separator />
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-primary-foreground"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
} 