// TEST COMMENT
import { Code2 } from 'lucide-react';
import ShinyText from '@/components/ui/ShinyText';
import { techTags } from '@/data/tech-tags';
import { heroContent } from '@/data/hero';
import { OptimizedImage } from '@/components/ui/optimized-image';

export function HeroSection() {
  return (
    <section id="home" className="min-h-[90vh] flex items-center relative">
      <div className="container max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm text-primary/90 shadow-sm shadow-primary/5">
                <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm font-medium">你好，我是</span>
              </div>

              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                <ShinyText text={heroContent.title} disabled={false} speed={3} className='custom-class' />
              </div>

              <p className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium">
                {heroContent.subtitle}
              </p>
            </div>

            <p className="text-lg text-muted-foreground/80">
              {heroContent.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {techTags.map((tag) => (
                <span key={tag} className="px-4 py-2 text-sm rounded-full bg-primary/10 text-primary/70 border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 右侧头像 */}
          <div className="relative order-1 md:order-2">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <OptimizedImage
                src="/avatar.jpg"
                alt="Jimmy"
                width={320}
                height={320}
                priority={true}
                className="w-full h-full object-cover rounded-3xl shadow-2xl border border-primary/10"
              />
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/8 via-primary/12 to-primary/8 backdrop-blur-md flex items-center justify-center border border-primary/30 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <Code2 className="h-6 w-6 text-primary/90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}