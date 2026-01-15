export interface Skill {
  name: string;
  level: number;
}

export const skills: Skill[] = [
  { name: '后端开发（GoLang / Java）', level: 75 },
  { name: '前端开发（React / Vue / Vite）', level: 65 },
  { name: '产品设计与交互优化', level: 80 },
  { name: '系统架构与自动化（Supabase / Vercel / MySQL / Redis）', level: 40 },
]; 