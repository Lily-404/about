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
          
          const maxScroll = 1000;
          const progress = Math.min(lastScrollY / maxScroll, 1);
          setScrollProgress(progress);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navWidth = 80 - (scrollProgress * 30);

  return (
    <>
      {/* 桌面端导航 */}
      <nav 
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:block rounded-full",
          isScrolling 
            ? theme === 'light'
              ? "bg-white/80 backdrop-blur-xl border border-zinc-200/50 shadow-lg"
              : "bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/30 shadow-lg"
            : "bg-transparent"
        )}
        style={{
          width: `${navWidth}%`,
          transform: `translate(-50%, ${isScrolling ? '0' : '0'})`,
          boxShadow: isScrolling 
            ? theme === 'light'
              ? '0 4px 30px rgba(0, 0, 0, 0.08)'
              : '0 4px 30px rgba(0, 0, 0, 0.15)'
            : 'none',
        }}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="./avatar.png"
              alt="logo"
              className="
                h-9 w-9 rounded-lg shadow-lg
                transition-all duration-300
                hover:scale-110 hover:shadow-[0_0_16px_4px_rgba(255,255,255,0.5)]
                ring-2 ring-gray-300/60
                bg-gradient-to-br from-white/10 to-yellow-100/10
                hover:rotate-12
              "
            />
            {/* <span className="text-xl font-bold dark:text-zinc-200 ">Jimmy</span> */}
          </div>
          <div className="flex items-center space-x-8">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  'text-sm font-medium transition-all duration-300 relative group',
                  activeSection === id 
                    ? 'text-zinc-900 dark:text-zinc-100 dark:drop-shadow-[0_0_8px_#e5e7eb]'
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
            className="rounded-full hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 transition-all duration-300 hover:scale-110"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* 移动端导航 */}
      <nav className={cn(
        "md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[85%]",
        theme === 'light'
          ? "bg-white/80 backdrop-blur-xl border border-zinc-200/50 rounded-full shadow-lg"
          : "bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/30 rounded-full shadow-lg",
        "transition-all duration-700 ease-out"
      )}>
        <div className="container mx-auto px-4 h-12">
          <div className="flex items-center justify-around h-full">
            {navItems.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 text-[10px] transition-all duration-300',
                  activeSection === id 
                    ? 'text-zinc-900 dark:text-zinc-100 dark:drop-shadow-[0_0_8px_#e5e7eb]'
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
                  <span className="font-medium text-zinc-600 dark:text-zinc-400">暗色</span>
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  <span className="font-medium text-zinc-600 dark:text-zinc-400">亮色</span>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
} 