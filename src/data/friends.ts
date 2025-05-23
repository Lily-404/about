
export interface Friend {
  name: string;
  url: string;
  description: string;
  avatar?: string;
}

export const friends: Friend[] = [
  {
    name: "liruifengv",
    url: "https://liruifengv.com/",
    description: "Web 开发者，Astro 项目成员，开源爱好者。",
    avatar: "/friend1.webp"
   },
 {
    name: "Aaron Conlon",
    url: "https://i5lin.top/",
    description: "一名全栈开发人员，热衷于提供卓越的成果。",
    avatar: "/friend2.png"
  },
  {
    name: "Leetao",
    url: "https://leetao.me/",
    description: "后端工程师，写有趣的代码，做有趣的事",
    avatar: "/friend3.jpg"
  }


]; 