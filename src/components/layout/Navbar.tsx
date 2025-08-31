import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';


interface NavbarProps {
  activeSection: string;
  navItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export function Navbar({ activeSection, navItems, setActiveSection }: NavbarProps) {
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

  const navWidth = 50 - (scrollProgress * 10);

  return (
    <>
      {/* 桌面端导航 */}
      <nav 
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:block rounded-full",
          isScrolling 
            ? "bg-zinc-900/20 backdrop-blur-lg border border-[#363B3C]/50 shadow-lg"
            : "bg-transparent"
        )}
        style={{
          width: `${navWidth}%`,
          transform: `translate(-50%, ${isScrolling ? '0' : '0'})`,
          boxShadow: isScrolling ? '0 4px 30px rgba(0, 0, 0, 0.15)' : 'none',
        }}
      >
        <div className="container mx-auto px-6 h-12 flex items-center justify-center">
          
          <div className="flex items-center space-x-12">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  'text-sm font-medium transition-all duration-300 relative group',
                  activeSection === id 
                    ? 'text-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-100'
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
                    "absolute left-[-15px] top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#9CFF4A] transition-opacity duration-300",
                    activeSection === id ? "opacity-100" : "opacity-0"
                  )}
                />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 移动端导航 */}
      <nav className={cn(
        "md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[85%]",
        "bg-zinc-900/20 backdrop-blur-xl border border-[#363B3C]/50 rounded-full shadow-lg",
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
                    ? 'text-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-100'
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(id);
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
          </div>
        </div>
      </nav>
    </>
  );
}