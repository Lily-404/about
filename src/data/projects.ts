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
    description: 'Todo list命令行工具，面向开发者和技术爱好者，用于记录和管理待办事项',
    tech: ['Go', 'Cobra', 'CLI'],
    image: '../project2.png',
    link: 'https://github.com/Lily-404/todo',
  },
  {
    title: 'BrowseBase',
    description: '资源网站项目，采用拟物化交互体验',
    tech: ['Typescript', 'React', 'vite','Supabase'],
    image: '../project3.png',
    link: 'https://browsebase.pages.dev',
  },
  {
    title: 'NextForge',
    description: '个人落地页快速生成（填写信息->生成next.js项目->直接打包部署)',
    tech: [' Next.js', 'Tailwind CSS', 'Radix UI'],
    image: '../project4.png',
    link: 'https://next-forge-eta-henna.vercel.app/',
  },
  {
    title: '灰烬',
    description: '一个焚烧秘密的火炉',
    tech: ['Next.js',  'Tailwind CSS'],
    image: '../project6.png',
    link: 'https://secret.ashes.cloud/',
  },
]; 