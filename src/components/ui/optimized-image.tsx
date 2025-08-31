import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string; // Add sizes prop
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes, // Destructure sizes
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Define a set of common widths for srcset generation
  const imageWidths = [320, 640, 768, 1024, 1280, 1536, 1920, 2048, 3840];

  // Function to generate an optimized image URL for a given width
  const getOptimizedSrc = (originalSrc: string, w: number) => {
    if (originalSrc.startsWith('http')) {
      // Use the custom proxy for external images
      return `https://vercel-proxy.maikesi.vercel.app/api/image?url=${encodeURIComponent(originalSrc)}&width=${w}`;
    } else {
      // For local images, rely on Vercel's built-in image optimization
      // This assumes Vercel's image optimization is enabled and configured for your project.
      // Vercel's image optimization typically works by appending query parameters like ?w=
      // However, for a simple <img> tag, Vercel's automatic srcset generation might not happen.
      // A more robust solution for local images would be to use Vercel's <Image> component.
      // For now, we'll append a width parameter, assuming Vercel will handle it.
      const url = new URL(originalSrc, window.location.origin);
      url.searchParams.set('w', w.toString());
      return url.toString();
    }
  };

  // Generate srcset
  const srcset = imageWidths
    .map((w) => {
      const url = getOptimizedSrc(src, w);
      return `${url} ${w}w`;
    })
    .join(', ');

  // Determine the main src for the <img> tag
  const mainSrc = src.startsWith('http')
    ? getOptimizedSrc(src, width || 800) // Use proxy for external images
    : src; // Use original src for local images, Vercel will optimize based on context

  return (
    <div className={cn(
      'overflow-hidden',
      isLoading ? 'animate-pulse bg-muted' : '',
      className
    )}>
      <img
        src={mainSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoading(false)}
        className={cn(
          'duration-700 ease-in-out',
          isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0',
          className
        )}
        srcSet={srcset} // Add srcset
        sizes={sizes || '100vw'} // Add sizes, default to 100vw if not provided
        {...props}
      />
    </div>
  );
} 