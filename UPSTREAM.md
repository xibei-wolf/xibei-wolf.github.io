# 上游主题

- 主题：Mizuki
- 仓库：https://github.com/LyraVoid/Mizuki
- 固定提交：c06f0003089ca040d5b599b37f0ad0ae65726e95
- 初始化日期：2026-10-15
- 包管理器：pnpm 11.5.3

保留上游 LICENSE 和 LICENSE.MIT。个人配置位于 src/config，个人文章位于 src/content/posts，关于页位于 src/content/spec/about.md，新增知识索引位于 src/pages/knowledge.astro。

上游 README 和 docs/README.md 已公告 Mizuki 将逐步停止维护，后继项目为 Shirone。本版为贴近参考站风格而采用固定 Mizuki 版本；若需要持续跟进主题开发，应评估迁移 Shirone。个人文章保留为 Markdown，便于迁移。

Windows 安装使用 pnpm-workspace.yaml 中的 nodeLinker: hoisted 和 packageImportMethod: copy，规避默认依赖布局下 esbuild 的目录重命名错误。pnpm 11 不读取 .npmrc 中的这些设置。

主题升级前先提交并备份个人内容，检查上游差异，再升级依赖和构建。不要直接用上游目录覆盖整个博客。
