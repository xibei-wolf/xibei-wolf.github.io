import { LinkPreset, type NavBarConfig } from "../types/config";

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    { name: "知识索引", url: "/knowledge/", icon: "material-symbols:menu-book" },
    LinkPreset.Archive,
    { name: "关于我", url: "/about/", icon: "material-symbols:person" },
    { name: "GitHub", url: "https://github.com/xibei-wolf", icon: "fa7-brands:github", external: true },
  ],
};
