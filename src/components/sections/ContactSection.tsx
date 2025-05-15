import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { socialLinks } from '@/data/social';
import { Button } from '@/components/ui/button';
import { contactContent } from '@/data/contact';
import { WechatPopover } from '@/components/ui/wechat-popover';
import { logEvent, EventCategories, EventActions } from '@/lib/analytics';
import { MessageCircle } from 'lucide-react';

export function ContactSection() {
  const handleSocialClick = (platform: string, url: string) => {
    logEvent(
      EventCategories.SOCIAL,
      EventActions.CLICK,
      platform
    );
    window.location.href = url;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logEvent(
      EventCategories.CONTACT,
      EventActions.SUBMIT,
      'Contact Form'
    );
    // 处理表单提交逻辑
  };

  return (
    <section id="contact" className="scroll-mt-16 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">{contactContent.title}</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          {contactContent.description}
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <h3 className="text-2xl font-semibold">{contactContent.cards.cooperation.title}</h3>
              <p className="text-muted-foreground">
                {contactContent.cards.cooperation.description}
              </p>
              <Separator />
              <div className="space-y-4">
                {socialLinks.filter(link => link.label === 'Email' || link.label === 'Website').map((link) => {
                  const Icon = link.icon;
                  return (
                    <div key={link.label} className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <Button
                        variant="link"
                        className="p-0 h-auto hover:underline"
                        onClick={() => window.location.href = link.href}
                      >
                        {link.label}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </form>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">{contactContent.cards.social.title}</h3>
              <p className="text-muted-foreground">
                {contactContent.cards.social.description}
              </p>
              <Separator />
              <div className="flex flex-wrap gap-4">
                <WechatPopover>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:scale-110 transition-transform hover:bg-primary hover:text-primary-foreground"
                    aria-label="WeChat"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </WechatPopover>
                {socialLinks.filter(link => link.label !== 'Email' && link.label !== 'Website' && link.label !== 'WeChat').map((link) => {
                  const Icon = link.icon;
                  return (
                    <Button
                      key={link.label}
                      variant="outline"
                      size="icon"
                      className="hover:scale-110 transition-transform hover:bg-primary hover:text-primary-foreground"
                      aria-label={link.label}
                      onClick={() => handleSocialClick(link.label, link.href)}
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
} 