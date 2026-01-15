import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import GlassSurface from '../ui/GlassSurface';

interface NavbarProps {
  activeSection: string;
  navItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  setActiveSection: (id: string) => void;
}

// 检测是否为 Safari 或兼容性差的浏览器
const isIncompatibleBrowser = () => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent;
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isFirefox = /Firefox/.test(userAgent);
  const isOldIE = /MSIE|Trident/.test(userAgent);
  
  // 检测 backdrop-filter 支持
  const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(10px)');
  
  return isSafari || isFirefox || isOldIE || !supportsBackdropFilter;
};

export function Navbar({ activeSection, navItems, setActiveSection }: NavbarProps) {
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    setUseFallback(isIncompatibleBrowser());
  }, []);

  // 毛玻璃效果的样式类
  const glassStyle = "bg-card/50 backdrop-blur-xl border border-zinc-600/50 shadow-lg";

  return (
    <>
      {/* 桌面端导航 */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 max-w-[1100px] z-40 hidden md:block">
        {useFallback ? (
          <div className={cn("rounded-[40px] mx-auto px-8 h-12 flex items-center justify-center", glassStyle)}>
            <div className="flex items-center space-x-16">
              {navItems.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={cn(
                    'text-sm font-medium leading-none transition-all duration-300 relative group',
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
        ) : (
          <GlassSurface
            width="100%"
            borderRadius={40}
            style={{ height: 'auto'}}
            backgroundOpacity={0}
            blur={2.5}
            distortionScale={-50}
            displace={1}
            redOffset={5}
            greenOffset={15}
            blueOffset={25}
            brightness={50}
            opacity={0.93}
          >
            <div className="mx-auto px-8 h-12 flex items-center justify-center">
              <div className="flex items-center space-x-16">
                {navItems.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={cn(
                      'text-sm font-medium leading-none transition-all duration-300 relative group',
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
          </GlassSurface>
        )}
      </div>

      {/* 移动端导航 */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 z-40">
        {useFallback ? (
          <div className={cn("rounded-[30px] container mx-auto px-4 h-12", glassStyle)}>
            <div className="flex items-center justify-around h-full">
              {navItems.map(({ id, label, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={cn(
                    'flex flex-col items-center justify-center gap-0.5 text-xs transition-all duration-300',
                    activeSection === id 
                      ? 'text-zinc-50'
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
                    "h-5 w-5 transition-transform duration-300",
                    activeSection === id && "scale-110"
                  )} />
                  <span className="font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <GlassSurface
            width="100%"
            borderRadius={30}
            style={{ height: 'auto'}}
            backgroundOpacity={0}
            blur={2.5}
            distortionScale={-50}
            displace={1}
            redOffset={5}
            greenOffset={15}
            blueOffset={25}
            brightness={50}
            opacity={0.93}
          >
            <div className="container mx-auto px-4 h-12">
              <div className="flex items-center justify-around h-full">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={cn(
                      'flex flex-col items-center justify-center gap-0.5 text-xs transition-all duration-300',
                      activeSection === id 
                        ? 'text-zinc-50'
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
                      "h-5 w-5 transition-transform duration-300",
                      activeSection === id && "scale-110"
                    )} />
                    <span className="font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </GlassSurface>
        )}
      </div>
    </>
  );
}