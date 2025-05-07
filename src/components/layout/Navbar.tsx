import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeSection: string;
  navItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

export function Navbar({ theme, toggleTheme, activeSection, navItems }: NavbarProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolling(lastScrollY > 0);
          
          // 计算滚动进度 (0-1)
          const maxScroll = 400; // 最大滚动距离
          const progress = Math.min(lastScrollY / maxScroll, 1);
          // 使用缓动函数使动画更平滑
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          setScrollProgress(easeProgress);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 计算导航栏宽度，使用缓动函数
  const navWidth = 80 - (scrollProgress * 20); // 从80%渐变到60%

  return (
    <>
      {/* 桌面端导航 */}
      <nav 
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:block",
          "transition-all duration-700 ease-out",
          isScrolling 
            ? theme === 'light'
              ? "bg-zinc-50/30 backdrop-blur-xl border border-zinc-200/30 rounded-full shadow-lg"
              : "bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/30 rounded-full shadow-lg"
            : "bg-transparent"
        )}
        style={{
          width: `${navWidth}%`,
          transform: `translate(-50%, ${isScrolling ? '0' : '0'})`,
          boxShadow: isScrolling 
            ? theme === 'light'
              ? '0 4px 30px rgba(0, 0, 0, 0.03)'
              : '0 4px 30px rgba(0, 0, 0, 0.15)'
            : 'none',
        }}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold">Jimmy</span>
          <div className="flex items-center space-x-8">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  'text-sm font-medium transition-all duration-300 relative group',
                  activeSection === id ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                {label}
                <span 
                  className={cn(
                    "absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-all duration-300",
                    activeSection === id ? "w-4" : "w-0 group-hover:w-4"
                  )}
                />
              </a>
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-all duration-300 hover:scale-110"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* 移动端导航 */}
      <nav className={cn(
        "md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[85%]",
        theme === 'light'
          ? "bg-zinc-50/30 backdrop-blur-xl border border-zinc-200/30 rounded-full shadow-lg"
          : "bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/30 rounded-full shadow-lg",
        "transition-all duration-700 ease-out"
      )}>
        <div className="container mx-auto px-6 h-14">
          <div className="flex items-center justify-around h-full">
            {navItems.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 text-[10px] transition-all duration-300',
                  activeSection === id 
                    ? 'text-zinc-900 dark:text-zinc-100' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                <Icon className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  activeSection === id && "scale-110"
                )} />
                <span className="font-medium">{label}</span>
              </a>
            ))}
            <div 
              className="flex flex-col items-center justify-center gap-0.5 text-[10px] transition-all duration-300 cursor-pointer"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <>
                  <Moon className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  <span className="font-medium text-zinc-600 dark:text-zinc-400">主题</span>
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  <span className="font-medium text-zinc-600 dark:text-zinc-400">主题</span>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
} 