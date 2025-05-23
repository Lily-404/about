import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 h-12 md:h-12 flex items-center justify-between text-sm text-muted-foreground mb-16 md:mb-0">
        <span>© 2025 Jimmy. </span>
        <Separator orientation="vertical" className="h-4" />
        <span>React & Vite & Typescript & TailwindCSS</span>
      </div>
    </footer>
  );
} 