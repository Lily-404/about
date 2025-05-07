import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShinyText from '@/components/ui/ShinyText';
import { useTheme } from '@/providers/theme-provider';

export function HeroSection() {
  const { theme } = useTheme();

  return (
    <section id="home" className="min-h-[90vh] flex items-center relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-sm font-medium">你好，我是</span>
              </div>
              
              {theme === 'dark' ? (
                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                  <ShinyText text="Jimmy" disabled={false} speed={3} className='custom-class' />
                </div>
              ) : (
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
                  Jimmy
                </h1>
              )}

              <p className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                全栈开发工程师
              </p>
            </div>

            <p className="text-lg text-muted-foreground/80 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              专注于打造卓越的数字体验，运用现代网络技术构建可扩展且用户友好的应用程序。
              拥有丰富的全栈开发经验，致力于创造优秀的用户体验和高性能的技术解决方案。
            </p>

            <div className="flex flex-wrap gap-3 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
              <span className="px-4 py-2 text-sm rounded-full bg-primary/10 text-primary border border-primary/20">React</span>
              <span className="px-4 py-2 text-sm rounded-full bg-primary/10 text-primary border border-primary/20">TypeScript</span>
              <span className="px-4 py-2 text-sm rounded-full bg-primary/10 text-primary border border-primary/20">Node.js</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative overflow-hidden px-8"
                >
                  <span className="relative z-10">联系我</span>
                  <div className="absolute inset-0 bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative overflow-hidden px-8"
                >
                  <span className="relative z-10">查看项目</span>
                  <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Button>
              </div>
              
              <div className="flex gap-6 items-center">
                <a href="https://github.com/Lily-404" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="mailto:sxy1308075897@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* 右侧头像 */}
          <div className="relative order-1 md:order-2">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/10 to-transparent"></div>
              <img 
                src="/avatar.jpg" 
                alt="Jimmy" 
                className="w-full h-full object-cover rounded-2xl border-4 border-background shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl bg-primary/10 backdrop-blur-sm flex items-center justify-center border border-primary/20">
                <span className="text-3xl">👋</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
} 