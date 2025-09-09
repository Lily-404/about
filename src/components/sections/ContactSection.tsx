import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { contactContent } from '@/data/contact';
import { socialLinks } from '@/data/social';
import { friends } from '@/data/friends';
import { Globe, MessageCircle, X } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { WechatPopover } from '@/components/ui/wechat-popover';
import { logEvent, EventCategories, EventActions } from '@/lib/analytics';
import ShinyText from '@/components/ui/ShinyText';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export function ContactSection() {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理表单提交逻辑
  };

  const handleSocialClick = (platform: string, url: string) => {
    logEvent(
      EventCategories.SOCIAL,
      EventActions.CLICK,
      platform
    );
    window.open(url, '_blank');
  };

  // 只显示前5个友链
  const displayedFriends = friends.slice(0, 5);

  return (
    <section id="contact" className="scroll-mt-16">
      <div className="container max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold mb-4"><ShinyText text={contactContent.title} /></h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          {contactContent.description}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-card/50 backdrop-blur-xl border-zinc-700 hover:shadow-md transition-all duration-300 rounded-3xl">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <h3 className="text-2xl font-semibold text-zinc-300">{contactContent.cards.cooperation.title}</h3>
              <p className="text-muted-foreground">
                {contactContent.cards.cooperation.description}
              </p>
              <Separator className="bg-zinc-800" />
              <div className="space-y-6">
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
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Button
                        key={link.label}
                        variant="outline"
                        size="icon"
                        className=" transition-transform hover:bg-primary hover:text-primary-foreground"
                        aria-label={link.label}
                        onClick={() => handleSocialClick(link.label, link.href)}
                      >
                        <Icon className="h-5 w-5" />
                      </Button>
                    );
                  })}
                </div>
              </div>
            </form>
          </Card>

          <Card className="p-8 bg-card/50 border-zinc-700 backdrop-blur-xl hover:shadow-md transition-all duration-300 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-zinc-300">友情链接</h3>
              <div className="text-sm text-muted-foreground">
                共 {friends.length} 个友链
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedFriends.map((friend) => (
                <a
                  key={friend.url}
                  href={friend.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-all duration-200"
                >
                  <div className="relative w-9 h-9 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                    {friend.avatar ? (
                      <OptimizedImage
                        src={friend.avatar}
                        alt={friend.name}
                        width={36}
                        height={36}
                        className="object-cover rounded-none"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10 rounded-none">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 className="font-medium text-sm truncate group-hover:text-primary/80 transition-colors">
                        {friend.name}
                      </h4>
                    </div>
                    <div className="relative group/desc">
                      <p className="text-xs text-muted-foreground/60 line-clamp-1 mt-1">
                        {friend.description}
                      </p>
                      <div className="
                        absolute left-0 top-full mt-1 p-2 
                        bg-background text-foreground text-xs rounded-md shadow-lg border border-border 
                        opacity-0 invisible group-hover/desc:opacity-100 group-hover/desc:visible 
                        transition-all duration-200 z-50 
                        hidden md:block
                        w-max max-w-[240px] lg:max-w-[480px]
                      ">
                        {friend.description}
                      </div>


                    </div>
                  </div>
                </a>
              ))}
              {friends.length > 5 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <a
                      className="group flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200 border border-muted-foreground/10 hover:border-muted-foreground/20"
                    >
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          查看更多
                        </span>
                        <span className="text-xs text-muted-foreground/60">
                          +{friends.length - 5} 个友链
                        </span>
                      </div>
                    </a>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden flex flex-col [&>button]:hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-300 ease-out">
                    <div className="flex items-center justify-between px-6 py-3">
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-medium text-zinc-300">友链</h2>
                        <span className="text-sm text-muted-foreground/60">
                          {friends.length}
                        </span>
                      </div>
                      <DialogClose asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-muted/50"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span className="sr-only">关闭</span>
                        </Button>
                      </DialogClose>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {friends.map((friend, index) => (
                          <a
                            key={friend.url}
                            href={friend.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start gap-3 p-3 rounded-md hover:bg-muted/30 transition-all duration-200 border-b border-r border-muted/30 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-out hover:shadow-sm"
                            style={{
                              animationDelay: `${index * 30}ms`,
                              animationFillMode: 'both'
                            }}
                          >
                            <div className="relative w-9 h-9 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                              {friend.avatar ? (
                                <OptimizedImage
                                  src={friend.avatar}
                                  alt={friend.name}
                                  width={36}
                                  height={36}
                                  className="object-cover rounded-none"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/10 rounded-none">
                                  <Globe className="h-4 w-4 text-primary" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1">
                                <h4 className="font-medium text-sm truncate text-zinc-300 group-hover:text-primary/80 transition-colors">
                                  {friend.name}
                                </h4>
                              </div>
                              <div className="relative">
                                <p className="text-xs text-muted-foreground/60 line-clamp-1 mt-1">
                                  {friend.description}
                                </p>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
} 