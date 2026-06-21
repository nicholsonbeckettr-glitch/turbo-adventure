# 本地知识库使用说明

这个目录可以作为 Obsidian Vault 打开，也可以把 `notes/` 子目录放进你现有的 Obsidian Vault 后同步回来。

知识脉络、证据分层和扩展优先级见 `INDEX.md`。

最小工作流：

1. 在 `knowledge/notes/` 新建一篇 Markdown 笔记。
2. 按现有笔记的 YAML front matter 填写 `supplement`、`targets`、`title`、`summary` 等字段。
3. 在 `knowledge/manifest.json` 的 `notes` 里加入这篇笔记路径。
4. 部署到 Cloudflare Pages 后，用户下载报告时会自动把这些笔记合并进交叉验证内容。

注意：

- 线上网站不能直接读取你电脑里任意位置的 Obsidian Vault。
- 要让线上报告使用某篇笔记，笔记必须在本项目目录内，并被 `manifest.json` 引用。
- 不要把用户个人病历、身份证、手机号等敏感信息放进这个公开知识库。
