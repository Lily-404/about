import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SideNavProps {
  navItems: Array<{
    id: string;
    icon: LucideIcon;
  }>;
  activeSection: string;
}

export function SideNav({ navItems, activeSection }: SideNavProps) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {navItems.map(({ id, icon: Icon }) => (
        <a
          key={id}
          href={`#${id}`}
          className={cn(
            'p-2 rounded-full transition-all hover:bg-primary hover:text-primary-foreground',
            activeSection === id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
          )}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
} 