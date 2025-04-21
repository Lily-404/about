# 个人作品集网站

这是一个使用 React、TypeScript 和 Tailwind CSS 构建的现代个人作品集网站。

## 项目特点

- 🎨 现代化设计
- 🌓 深色/浅色主题
- 📱 完全响应式
- ⚡ 性能优化
- 🎯 SEO 友好

## 快速开始

1. 克隆项目后运行:

```bash
npm install
npm run dev
```

2. 打开浏览器访问 `http://localhost:5173`

## 项目结构

```
src/
├── components/    # UI组件
├── lib/          # 工具函数
├── hooks/        # React钩子
└── App.tsx       # 主应用组件
```

## 常见修改指南

### 1. 修改个人信息

打开 `src/App.tsx`，修改以下部分：

```typescript
// 修改名字
<span className="text-xl font-bold">Jimmy</span>

// 修改职位描述
<p className="text-xl sm:text-2xl lg:text-3xl">
  全栈开发工程师 & UI/UX 设计师
</p>
```

### 2. 添加新项目

在 `projects` 数组中添加新项目：

```typescript
{
  title: '项目名称',
  description: '项目描述',
  tech: ['使用的技术1', '技术2'],
  image: '项目图片URL'
}
```

### 3. 更新技能

修改技能数组：

```typescript
[
  { name: '技能名称', level: 95 },
  // 添加更多技能
]
```

### 4. 添加工作经验

在工作经验数组中添加：

```typescript
{
  company: '公司名称',
  position: '职位',
  period: '时间段',
  description: '工作描述'
}
```

## 数据库集成方案

要添加数据库支持，建议使用 Supabase 实现以下功能：

1. 项目展示

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  technologies TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

2. 工作经验

```sql
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  period TEXT,
  description TEXT,
  type TEXT CHECK (type IN ('work', 'education')),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

3. 技能评估

```sql
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  level INTEGER CHECK (level BETWEEN 0 AND 100),
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 集成步骤

1. 点击右上角的 "Connect to Supabase" 按钮创建新项目
2. 安装依赖：

```json
{
  "dependencies": {
    "@supabase/supabase-js": "latest"
  }
}
```

3. 创建 Supabase 客户端：

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

4. 创建数据获取钩子：

```typescript
function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      setProjects(data);
    }
    fetchProjects();
  }, []);

  return projects;
}
```

5. 在组件中使用：

```typescript
function ProjectsSection() {
  const projects = useProjects();
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
```

## 性能优化建议

1. 图片优化

- 使用适当的图片尺寸
- 添加 loading="lazy" 属性
- 考虑使用 WebP 格式

2. 组件优化

- 使用 React.memo() 优化重复渲染
- 实现虚拟滚动处理大量数据

3. 构建优化

- 启用代码分割
- 优化依赖大小
- 使用 Lighthouse 监控性能

## 部署

项目可以轻松部署到 Netlify：

1. 确保代码已提交
2. 点击 "Deploy to Netlify" 按钮
3. 等待部署完成

## 技术支持

如需帮助，可以：

1. 查看组件文档
2. 参考 Tailwind CSS 文档
3. 检查 React 官方文档
# about
