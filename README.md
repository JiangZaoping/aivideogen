# AI视频生成模型研究报告

AI视频生成技术研究和文档项目，包含市场分析报告、技术文档和文档生成工具。

## 项目内容

### 📄 研究报告
- **AI视频生成模型市场报告_2025.md**: 2025-2026年AI视频生成模型市场综合分析
  - 闭源/商业模型：Sora 2、Veo 3、Runway、Pika、可灵、即梦、清影
  - 开源模型：HunyuanVideo、LTX-Video、SVD、AnimateDiff、Wan 2.1
  - 性能对比表、优缺点分析、选择建议

### 📚 技术文档
- **ComfyUI与视频大模型关系详解.md**: ComfyUI工作流平台与视频生成模型的关系说明

### 🛠️ 工具
- **generate_docx.js**: 将Markdown报告转换为格式化Word文档的Node.js脚本

## 快速开始

### 生成Word文档

```bash
# 安装依赖
npm install

# 生成Word文档
node generate_docx.js
```

输出文件：`AI视频生成模型市场报告_2025.docx`

### 直接阅读Markdown

所有报告和技术文档都使用Markdown格式，可以直接在以下平台阅读：
- GitHub/GitLab网页界面
- Markdown编辑器（Typora、VS Code等）
- 支持Markdown的笔记应用

## 项目结构

```
aiv/
├── AI视频生成模型市场报告_2025.md    # 市场研究报告（Markdown源文件）
├── ComfyUI与视频大模型关系详解.md    # 技术文档
├── generate_docx.js                  # Word文档生成脚本
├── package.json                     # Node.js项目配置
├── CLAUDE.md                        # Claude Code开发指南
└── README.md                        # 项目说明（本文件）
```

## 技术栈

- **文档格式**: Markdown
- **Word生成**: Node.js + docx库
- **版本控制**: Git

## 更新频率

建议每3-6个月更新一次报告内容，AI视频生成领域发展迅速。

## 许可证

ISC

## 作者

AI视频生成研究项目
