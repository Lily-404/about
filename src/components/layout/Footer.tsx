import { Separator } from '@/components/ui/separator';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t  dark:border-gray-700">
      <div className="container max-w-6xl mx-auto px-8 h-12 md:h-12 flex items-center justify-between text-sm text-muted-foreground">
        <span>© 2025 Designed By Jimmy</span>
        <div className="flex items-center gap-4">
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="h-8 w-8 p-0"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
} 