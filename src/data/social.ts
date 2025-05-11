import { Github, Mail,  Globe } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    icon: Github,
    href: 'https://github.com/Lily-404',
    label: 'GitHub',
  },
  {
    icon: Mail,
    href: 'mailto:sxy1308075897@gmail.com',
    label: 'Email',
  },
  {
    icon: Globe,
    href: 'https://www.jimmy-blog.top/',
    label: 'Website',
  },
  
]; 