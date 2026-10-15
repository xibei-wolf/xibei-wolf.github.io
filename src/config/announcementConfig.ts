import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
  title: "小站开始生长",
  content: "这里记录学习、实践和思考。每一次理解，都值得留下痕迹。",
  closable: true,
  link: { enable: true, text: "从知识索引开始", url: "/knowledge/", external: false },
};
