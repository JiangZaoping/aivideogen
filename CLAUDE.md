# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI video generation research and documentation project (aiv - AI Video). The repository contains market research reports on AI video generation models, technical documentation, and tools for generating formatted documents.

### Key Artifacts

- **AI视频生成模型市场报告_2025.md**: Comprehensive market analysis of AI video generation models (open-source and closed-source)
- **ComfyUI与视频大模型关系详解.md**: Technical documentation explaining the relationship between ComfyUI and video generation models
- **generate_docx.js**: Node.js script that converts markdown reports to formatted Word documents (.docx)

## Development Commands

### Generate Word Document from Markdown

The `generate_docx.js` script creates a professionally formatted Word document with embedded content:

```bash
# Install dependencies (first time only)
npm install

# Generate the Word document
node generate_docx.js
```

**Output**: `AI视频生成模型市场报告_2025.docx`

### Dependencies

- **docx** (^9.5.1): JavaScript library for creating .docx files
- **Node.js**: Required runtime

## Code Architecture

### Document Generation Pipeline

```
Markdown Source (AI视频生成模型市场报告_2025.md)
    ↓
generate_docx.js (Node.js + docx library)
    ↓
Word Document (.docx with formatted tables, headings, links)
```

### Key Components in generate_docx.js

1. **Helper Functions**: Reusable components for document elements
   - `createHeading(text, level)`: Creates H1-H4 headings with color coding
   - `createParagraph(text, options)`: Creates formatted paragraphs
   - `createBulletItem(text)`: Creates bulleted list items
   - `createHyperlink(text, url)`: Creates clickable hyperlinks
   - `createTableRow(cells, isHeader)`: Creates table rows with borders

2. **Document Structure**:
   - Uses `docx` library's Document, Packer, Paragraph, TextRun, Table components
   - Defines custom styles for hierarchical headings (H1-H4)
   - Implements table borders, cell shading, and vertical alignment
   - Includes page breaks and external hyperlinks

3. **Numbering Configuration**:
   - Single bullet list reference: `"bullet-list"`
   - Uses `LevelFormat.BULLET` constant (NOT the string "bullet")

### Document Styling Standards

- **Font**: Arial (universal compatibility)
- **Heading Colors**:
  - H1: `#1F4E78` (dark blue)
  - H2: `#2E5090` (medium blue)
  - H3: `#375623` (green)
- **Table Headers**: Light blue background (`#D5E8F0`) with centered text
- **Margins**: 1 inch (1440 DXA) on all sides
- **Page Size**: Letter format

### Critical Formatting Rules

1. **Never use `\n` for line breaks** - Always use separate Paragraph elements
2. **Table column widths**: Must set BOTH `columnWidths` array at table level AND individual cell `width` properties
3. **Shading type**: Always use `ShadingType.CLEAR` (never `ShadingType.SOLID`, causes black backgrounds)
4. **PageBreak**: Must be inside a Paragraph children array, never standalone
5. **ImageRun**: Requires `type` parameter ("png", "jpg", etc.)
6. **Hyperlinks**: Use `ExternalHyperlink` class with `style: "Hyperlink"` for blue underlined links

### Content Organization

The Word document contains 8 main sections:

1. **闭源/商业视频生成模型** (Closed-source models): Sora 2, Veo 3, Runway, Pika, Kling, 即梦, 清影
2. **开源视频生成模型** (Open-source models): HunyuanVideo, LTX-Video, SVD, AnimateDiff, Wan 2.1
3. **综合对比分析** (Comparative analysis): Performance tables, pros/cons
4. **行业趋势分析** (Industry trends): Gap narrowing, multimodal integration, Chinese vendors
5. **选择建议** (Selection guidance): By use case, budget, technical ability
6. **技术选型建议** (Technical selection): Deployment roadmaps, subscription comparisons
7. **学习资源** (Learning resources): Official links, community tutorials
8. **未来展望** (Future outlook): 2025-2026 predictions

## File Naming Conventions

- Markdown reports: `*_报告_*.md` (Chinese title with date)
- Word documents: `*_报告_*.docx` (matching markdown source)
- Generated scripts: `generate_*.js` (descriptive names)

## Language Preferences

- **Documentation**: Simplified Chinese (简体中文) by default
- **Code comments**: Chinese or English as appropriate
- **Variable names**: English (standard JavaScript conventions)

## Important Notes

- The markdown source files are the single source of truth for content
- `generate_docx.js` hardcodes the document structure (not a generic markdown-to-docx converter)
- When adding new content to reports, update BOTH the markdown file AND the JavaScript generation script
- Table column widths use DXA units (twentieths of a point): 1440 = 1 inch, Letter usable width = 9360 DXA
- External links must use proper URL encoding for special characters
