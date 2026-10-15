# 成长手记

作者：西北孤傲的狼 · GitHub：[xibei-wolf](https://github.com/xibei-wolf)

基于 [Mizuki](https://github.com/LyraVoid/Mizuki) 构建的个人博客。首页展示博文，知识索引按文章分类自动汇总，另有归档、标签、搜索、关于页、RSS 和明暗主题。

## 本地使用

需要 Node.js 24 和 pnpm。项目在 package.json 中指定 pnpm 11.5.3，pnpm 会依据项目配置匹配版本。

```powershell
pnpm.cmd install --frozen-lockfile
pnpm.cmd dev
```

在浏览器打开终端显示的本地地址，通常为 http://localhost:3000/ 。项目外层提供“启动博客.cmd”作为快捷入口。

生产构建和预览：

```powershell
pnpm.cmd build
pnpm.cmd preview
```

搜索索引在 pnpm build 时生成，完整搜索功能请使用生产预览验证。

## 写一篇文章

```powershell
pnpm.cmd new-post my-first-note
```

编辑 src/content/posts/my-first-note.md。文章生成时默认为草稿；准备发布后把 draft 改为 false。

```yaml
---
title: 我的第一条学习笔记
published: 2026-10-15
description: 这次学习解决了什么问题。
tags: [学习笔记]
category: 学习笔记
draft: true
---
```

正文写在第二个 `---` 后面。文章分类会自动出现在知识索引中，不需要逐篇维护链接。草稿在开发模式可预览，生产构建不发布；不要把个人秘密或凭据写进将要推送到公开仓库的草稿中。

建议每篇记录包含问题、自己的理解、验证过程和下一步。图片可放在文章同目录并使用相对路径，或放在 public/images 下并用 /images/文件名 引用。

两篇初始博文是可编辑的起始文稿，不代表已完成的学习成果。可以直接修改或删除。

## 修改个人资料和外观

| 文件 | 用途 |
| --- | --- |
| src/config/siteConfig.ts | 站名、网址、语言、主题色和横幅 |
| src/config/profileConfig.ts | 昵称、头像、简介和社交链接 |
| src/config/navBarConfig.ts | 顶部导航 |
| src/config/sidebarConfig.ts | 侧栏组件 |
| src/config/announcementConfig.ts | 公告文字 |
| src/content/spec/about.md | 关于页正文 |
| public/assets/growth | 本站的矢量背景和头像 |

当前使用系统字体，音乐、看板娘、评论、第三方统计和其他特色页面均关闭。文章授权协议尚未设定，原主题的自动 Creative Commons 授权卡片已关闭。保留主题许可证和致谢。

## GitHub Pages

目标仓库：xibei-wolf/xibei-wolf.github.io。目标地址：https://xibei-wolf.github.io/ 。这些是部署配置，是否已上线以实际 GitHub Actions 结果为准。

在该仓库的 Settings → Pages → Build and deployment 中将 Source 设为 GitHub Actions。代码推送到 main 后，.github/workflows/deploy.yml 会安装依赖、构建 dist、生成 Pagefind 索引并发布。

本地 .env 已关闭外部内容同步；CI 中也明确设置 ENABLE_CONTENT_SYNC=false，不需要额外内容仓库或部署密码。

日常更新：

```powershell
git add .
git commit -m "docs: add a learning note"
git push
```

等待仓库 Actions 中的 Deploy blog to GitHub Pages 工作流成功即可。电脑不需要一直开机。

## 目录和备份

此 blog 文件夹是完整项目。外层的 _evaluation 保存下载资料和移出的上游示例，不应推送到博客仓库。

主题来源和固定版本记录在 UPSTREAM.md。升级主题前先提交个人内容并检查差异；不要直接覆盖整个目录。
