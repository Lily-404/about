import ReactGA from 'react-ga4';

// 初始化 GA
export const initGA = () => {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (gaId) {
    ReactGA.initialize(gaId);
  }
};

// 记录页面浏览
export const logPageView = (path: string, title?: string) => {
  ReactGA.send({ 
    hitType: "pageview", 
    page: path,
    title: title
  });
};

// 记录事件
export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label
  });
};

// 预定义的事件类别
export const EventCategories = {
  NAVIGATION: 'Navigation',
  PROJECTS: 'Projects',
  SOCIAL: 'Social',
  CONTACT: 'Contact',
  THEME: 'Theme',
  BLOG: 'Blog'
} as const;

// 预定义的事件动作
export const EventActions = {
  CLICK: 'Click',
  SUBMIT: 'Submit',
  TOGGLE: 'Toggle',
  VIEW: 'View',
  COPY: 'Copy'
} as const; 