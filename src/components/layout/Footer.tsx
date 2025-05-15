import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between text-sm text-muted-foreground">
        <span>© 2025 Jimmy. </span>
        <Separator orientation="vertical" className="h-4" />
        <span>React & Vite & Typescript & TailwindCSS</span>
      </div>
    </footer>
  );
} 