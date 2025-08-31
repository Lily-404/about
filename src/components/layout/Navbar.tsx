import { cn } from '@/lib/utils';
import GlassSurface from '../ui/GlassSurface';

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
  return (
    <>
      {/* 桌面端导航 */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-[1100px] z-40 hidden md:block">
        <GlassSurface
          width="100%"
          borderRadius={40}
          style={{ height: 'auto', blur: 2}}
          distortionScale={-20}
          displace={0.2}
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
        </GlassSurface>
      </div>

      {/* 移动端导航 */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-9/12 z-40">
        <GlassSurface
          width="100%"
          borderRadius={30}
          style={{ height: 'auto', backgroundOpacity: 0.1, blur: 2 }}
          distortionScale={-50}
          displace={0.2}
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
                    "h-5 w-5 transition-transform duration-300",
                    activeSection === id && "scale-110"
                  )} />
                  <span className="font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </GlassSurface>
      </div>
    </>
  );
}