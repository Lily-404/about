export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
}

export const projects: Project[] = [
  {
    title: "Jimmy'blog",
    description: '简约但不简单的现代化个人博客',
    tech: ['Next.js', 'shadcn/ui', 'Tailwind CSS'],
    image: '../project5.png',
    link: 'https://www.jimmy-blog.top/',
  },
  {
    title: 'GO TODO',
    description: 'Todo list命令行工具',
    tech: ['Go', 'Cobra', 'CLI'],
    image: '../project2.png',
    link: 'https://github.com/Lily-404/todo',
  },

  {
    title: 'BrowseBase',
    description: '拟物化资源网站',
    tech: ['Typescript', 'React', 'vite','Supabase'],
    image: 'project3.png',
    link: 'https://browsebase.pages.dev',
  },
  {
    title: 'NextForge',
    description: 'Next.js个人落地页生成器',
    tech: [' Next.js', 'Tailwind CSS', 'Radix UI'],
    image: '../project4.png',
    link: 'https://next-forge-eta-henna.vercel.app/',
  },
  {
    title: 'GO Search',
    description: '终端快速搜索',
    tech: ['Go', 'Cobra', 'CLI'],
    image: '../project1.png',
    link: 'https://github.com/Lily-404/search',
  },
  {
    title: '灰烬',
    description: '一个焚烧秘密的火炉',
    tech: ['Next.js',  'Tailwind CSS'],
    image: '../project6.png',
    link: 'https://secret.ashes.cloud/',
  },
]; 