import type { ProfileConfig } from "../types/config";

export const profileConfig: ProfileConfig = {
  avatar: "/assets/growth/avatar.svg",
  name: "西北孤傲的狼",
  bio: "记录所学，留下思考，慢慢成长。",
  typewriter: { enable: false, speed: 80 },
  links: [
    { name: "GitHub", icon: "fa7-brands:github", url: "https://github.com/xibei-wolf" },
    { name: "RSS", icon: "material-symbols:rss-feed", url: "/rss.xml" },
  ],
};
