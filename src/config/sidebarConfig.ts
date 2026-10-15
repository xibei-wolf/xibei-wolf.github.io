import type { SidebarLayoutConfig } from "../types/config";

export const sidebarLayoutConfig: SidebarLayoutConfig = {
  properties: [
    { type: "profile", position: "top", class: "onload-animation", animationDelay: 0 },
    { type: "announcement", position: "top", class: "onload-animation", animationDelay: 50 },
    { type: "categories", position: "top", class: "onload-animation", animationDelay: 100, responsive: { collapseThreshold: 6 } },
    { type: "tags", position: "top", class: "onload-animation", animationDelay: 150, responsive: { collapseThreshold: 15 } },
    { type: "card-toc", position: "sticky", class: "onload-animation", animationDelay: 200 },
    { type: "site-stats", position: "top", class: "onload-animation", animationDelay: 100 },
  ],
  components: {
    left: ["profile", "announcement", "categories", "tags"],
    right: ["site-stats", "card-toc"],
    drawer: ["profile", "announcement", "categories", "tags"],
  },
  defaultAnimation: { enable: true, baseDelay: 0, increment: 50 },
  responsive: { breakpoints: { mobile: 768, tablet: 1280, desktop: 1280 } },
};
