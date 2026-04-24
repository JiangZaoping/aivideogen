# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI 视频生成研究工作区 — 内容仓库，聚焦 AI 视频生成技术、市场分析和工程实践。使用中文编写所有内容。

## Repository Structure

- `docs/` — 研究报告和长文参考资料（`.md` 源文件 + `.docx`/`.pptx` 导出件）
- `images/` — 跨文档共享图片资源
- `sect01/` — 按章节组织的生成图片和可视化素材
- `scripts/` — 自动化脚本（PPT 生成等）

## Commands

无构建系统或自动化测试。验证方式：

```bash
# 检查变更文件
rtk git status

# 确认文件放置和命名
rg --files

# 生成 PPT（Harness Engineering 演示文稿）
python scripts/generate_harness_ppt.py
```

新增脚本时，附带可复现的验证命令并放在 `tests/` 目录下。

## Conventions

- Markdown 为可编辑源文档格式，保持简洁、结构化、可直接发布
- 保留现有中文文件名（如 `AI视频生成模型市场报告_2025.md`），不强制英文化
- 目录名使用小写（`docs`、`images`、`scripts`）
- 提交信息使用中文，简短祈使句式，如 `更新项目配置和文档`
- 新研究笔记放 `docs/`，生成图片放对应章节目录
- 不要向仓库根目录添加临时文件

## Key Documents

- `docs/AI视频生成模型市场报告_2025.md` — 商业 AI 视频模型对比分析
- `docs/ComfyUI与视频大模型关系详解.md` — ComfyUI 节点式工作流与视频模型集成
- `docs/Harness Engineering视频解读PPT.md` — AI 工程可靠性方法论（TGLTommy 视频整理）
