# 个人作品集网站项目文档

## 已完成功能

### 1. 主题切换系统

- 实现了亮色/暗色主题的动态切换
- 主题状态持久化存储
- 平滑的主题切换动画效果

### 2. 导航系统

- 固定顶部导航栏，支持半透明效果
- 左侧固定导航图标（大屏设备）
- 智能滚动检测当前页面位置
- 页面滚动进度条显示

### 3. 页面布局与内容

- 首页(Home)部分：个人简介和CTA按钮
- 关于(About)部分：专业背景和技能展示
- 经验(Experience)部分：工作经历和教育背景
- 项目(Projects)部分：项目展示卡片
- 联系(Contact)部分：社交媒体链接

### 4. UI组件系统

- 使用shadcn/ui组件库
- 包含多个可复用的UI组件：
  - Button
  - Card
  - Progress
  - Tabs
  - Separator等

## 未完成功能

1. **响应式导航菜单**

   - 移动端菜单尚未实现
   - 需要添加汉堡菜单按钮和抽屉式导航
2. **表单功能**

   - 联系表单的实现
   - 表单验证
   - 提交功能
3. **项目展示优化**

   - 项目详情页面
   - 项目筛选功能
   - 更多项目加载功能
4. **性能优化**

   - 图片懒加载优化
   - 组件代码分割
   - 页面加载性能优化
5. **动画效果**

   - 更多的页面过渡动画
   - 滚动动画效果
   - 交互反馈动画

## 核心技术流程

### 1. 主题切换流程

```typescript
// 主题状态管理
const [theme, setTheme] = useState<'light' | 'dark'>('light');

// 主题切换逻辑
const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
};
```

### 2. 滚动检测系统

```typescript
// 滚动进度和活动部分检测
const handleScroll = () => {
    // ... existing code ...
  
    // 计算滚动进度
    if (mainRef.current) {
        const totalHeight = mainRef.current.scrollHeight - window.innerHeight;
        const progress = (currentScrollPos / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, progress)));
    }
  
    // 检测当前活动部分
    const sections = ['home', 'about', 'experience', 'projects', 'contact'];
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                setActiveSection(section);
                break;
            }
        }
    }
};
```

### 3. 组件系统架构

项目使用了模块化的组件结构：

- `/components/ui/`: 基础UI组件
- `/lib/utils.ts`: 工具函数
- `/hooks/`: 自定义Hooks

### 4. 样式系统

- 使用Tailwind CSS进行样式管理
- 支持暗色主题
- 响应式设计
- 自定义动画效果

## 技术栈

- React + TypeScript
- Tailwind CSS
- shadcn/ui组件库
- Vite构建工具
- React Hooks
- localStorage持久化存储
