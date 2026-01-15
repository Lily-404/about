import { Globe, Code2, Award, MessageSquare, BookOpen } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const navItems: NavItem[] = [
  { id: 'home', label: '首页', icon: Globe },
  { id: 'about', label: '关于', icon: Code2 },
  { id: 'projects', label: '作品', icon: Award },
  { id: 'blog', label: '博客', icon: BookOpen },
  { id: 'contact', label: '联系', icon: MessageSquare },
]; 