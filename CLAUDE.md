# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI video generation research and documentation project (ivideo - AI Video). The repository contains comprehensive market research reports and technical documentation on AI video generation models.

## Repository Structure

```
ivideo/
├── docs/                                    # All documentation and reports
│   ├── AI视频生成模型市场报告_2025.md        # Market analysis (markdown source)
│   ├── AI视频生成模型市场报告_2025.docx      # Formatted Word export
│   └── ComfyUI与视频大模型关系详解.md        # Technical documentation
├── .gitignore                               # Excludes node_modules, .docx, temp files
└── CLAUDE.md                                # This file
```

## Key Documentation

### 1. AI视频生成模型市场报告_2025.md (Market Report)

Comprehensive analysis covering:
- **闭源/商业模型**: Sora 2, Veo 3, Runway Gen-4, Pika 2.0, Kling 1.6, 即梦, 清影
- **开源模型**: HunyuanVideo, LTX-Video, Stable Video Diffusion, AnimateDiff, Wan 2.1
- **对比分析**: Performance tables, pros/cons, selection guidance
- **行业趋势**: Multimodal integration, Chinese vendor rise, gap narrowing
- **技术选型**: Deployment roadmaps by budget and technical capability
- **未来展望**: 2025-2026 predictions

### 2. ComfyUI与视频大模型关系详解.md (Technical Guide)

Explains the relationship between ComfyUI workflow platform and video generation models, including integration methods and use cases.

## Documentation Standards

### File Naming
- Markdown reports: `主题_报告_YYYY.md` (Chinese title with year)
- Word exports: Match markdown filename with `.docx` extension
- Use descriptive Chinese titles for clarity

### Content Organization
- Reports should include: overview, detailed analysis, comparisons, trends, recommendations, resources, outlook
- Use markdown tables for model comparisons and specifications
- Include external hyperlinks to official documentation and resources
- Maintain consistent heading hierarchy (H1 for title, H2 for sections, H3 for subsections)

### Language Preferences
- **Primary language**: Simplified Chinese (简体中文)
- **Technical terms**: English names preserved (e.g., "Sora", "HunyuanVideo", "ComfyUI")
- **Code/identifiers**: English only (if applicable in future)

## Working with Documentation

### Adding New Reports
1. Create markdown file in `docs/` with naming pattern: `主题_报告_YYYY.md`
2. Follow existing report structure for consistency
3. Include all 8 standard sections (if applicable): models overview, comparative analysis, trends, recommendations, technical selection, resources, outlook, references

### Updating Existing Reports
- Markdown files are the single source of truth
- Update dates and version numbers when models change
- Keep external links current and functional
- Maintain table formatting consistency

### Exporting to Word
- Word documents (`.docx`) are generated from markdown sources
- Generated Word files are tracked in git for convenience
- If regeneration is needed, implement a markdown-to-docx converter matching the existing formatting standards:
  - Font: Arial
  - Heading colors: H1 (#1F4E78), H2 (#2E5090), H3 (#375623)
  - Table headers: Light blue background (#D5E8F0)
  - Margins: 1 inch on all sides

## Important Notes

- This is a **documentation-only repository** (no application code)
- `.gitignore` excludes `node_modules/` and build artifacts, but tracks generated `.docx` files
- All documentation should be kept up-to-date with the latest AI video generation landscape
- When adding new models or tools, follow the established analytical framework

