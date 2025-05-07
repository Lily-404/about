import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShinyText from '@/components/ui/ShinyText';

export function HeroSection() {
  return (
    <section id="home" className="min-h-[80vh] flex flex-col justify-center relative">
      <div className="space-y-4 max-w-4xl">
        <span className="text-sm font-medium text-primary/60 animate-in fade-in slide-in-from-bottom-4 duration-700">
          你好，我是
        </span>
        <ShinyText text="Just some shiny text!" disabled={false} speed={3} className='custom-class' />
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold animate-in fade-in slide-in-from-bottom-4 duration-700">
          Jimmy
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          全栈开发工程师 & UI/UX 设计师
        </p>
        <p className="max-w-2xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          专注于打造卓越的数字体验，运用现代网络技术构建可扩展且用户友好的应用程序。
          拥有丰富的全栈开发经验，致力于创造优秀的用户体验和高性能的技术解决方案。
        </p>
        <div className="flex gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <Button size="lg">联系我</Button>
          <Button variant="outline" size="lg">查看项目</Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
} 