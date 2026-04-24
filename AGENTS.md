# Repository Guidelines

- Always respond in Chinese-simplified

## Project Overview
This repository is an AI video generation research and documentation workspace. It primarily stores market research, technical writeups, presentation materials, generated visuals, and related scripts, rather than an application codebase.

## Project Structure & Module Organization
Keep content organized by document type and asset purpose.

- `docs/`: research reports, technical documentation, presentation Markdown, and exported `.docx` or `.pptx`
- `images/`: shared image assets reused across documents
- `sect01/`: section-specific generated images and working visuals
- `scripts/`: utility scripts for content generation or export
- `README.md`: minimal repository entry point

Keep new research notes in `docs/`. Place generated or exported images in the most relevant asset folder instead of the repository root.

## Key Documentation
The following documents define the main content style and subject matter of the repository.

- `docs/AI视频生成模型市场报告_2025.md`: market analysis covering closed-source and open-source AI video models, comparative analysis, industry trends, selection guidance, and outlook
- `docs/AI视频生成模型市场报告_2025.docx`: formatted Word export of the market report
- `docs/ComfyUI与视频大模型关系详解.md`: technical guide covering the relationship between ComfyUI and video generation models

When adding new reports, follow the same analytical depth, structure, and naming style as these core documents.

## Documentation Standards
Prefer Markdown as the editable source of truth. Keep prose concise, structured, and publication-ready.

### File Naming
- Markdown reports: `主题_报告_YYYY.md`
- Word exports: match the Markdown filename with a `.docx` extension
- Presentation source or exported files should use descriptive Chinese titles where appropriate
- Preserve existing Chinese titles when they accurately reflect the subject matter

### Content Organization
- Maintain clear heading hierarchy with H1 for title, H2 for major sections, and H3 for subsections
- Reports should include, when applicable: overview, detailed analysis, comparative analysis, trends, recommendations, technical selection, resources, outlook, and references
- Use Markdown tables for model comparisons, specifications, and pros/cons summaries
- Include external hyperlinks to official documentation and resources where relevant
- Keep terminology consistent across related reports

### Language Preferences
- Primary language: Simplified Chinese
- Preserve established English technical names such as `Sora`, `HunyuanVideo`, and `ComfyUI`
- Use English for code, commands, identifiers, and file extensions

## Working With Documentation
Markdown files are the primary editable source. Generated Word or presentation files should stay aligned with their source documents.

### Adding New Reports
1. Create the Markdown file in `docs/` using the established naming pattern.
2. Follow the existing report structure for consistency.
3. Include the standard analytical sections when they fit the document type.

### Updating Existing Reports
- Update dates and version references when model capabilities or market conditions change
- Keep links current and verify they still resolve
- Preserve table formatting consistency across edits
- Do not split source material between Markdown and exported files; update the Markdown first

### Exporting to Word
- Word documents are generated from Markdown sources
- Generated `.docx` files are tracked in git for convenience
- If regeneration is needed, match the existing formatting standard:
- Font: `Arial`
- Heading colors: H1 `#1F4E78`, H2 `#2E5090`, H3 `#375623`
- Table headers: light blue background `#D5E8F0`
- Margins: 1 inch on all sides

## Build, Test, and Validation Commands
There is no formal build system or automated test suite at the repository level. Use lightweight validation before submitting changes.

- `git status`: review changed files before committing
- `rg --files`: confirm file placement and naming
- `Get-Content docs\\AI视频生成模型市场报告_2025.md`: spot-check Markdown content from PowerShell

When adding scripts or code, include a reproducible verification command and place tests next to that code or in a dedicated `tests/` folder if one is introduced later.

## Testing Guidelines
Validation is manual for most content changes.

- Proofread Markdown before commit
- Verify links, image references, and relative paths
- Confirm exported `.docx` or `.pptx` files open correctly and match the Markdown source
- Avoid committing generated temp files; `.gitignore` already excludes common editor, log, and temp artifacts

If a future toolchain is added, document the commands in `README.md` and update this guide in the same change.

## Important Notes
- This repository is documentation-first, even if small utility scripts are added
- Keep content aligned with the latest AI video generation landscape
- When adding new models, tools, or vendors, follow the established comparison framework rather than inserting ad hoc notes

## Commit & Pull Request Guidelines
Recent history favors short, imperative summaries in Chinese.

- Keep commit messages concise and specific to the change
- Group related content, asset, and structure updates into one commit
- In pull requests, include a short description, affected paths, and screenshots or rendered previews when layout or imagery changes
- Link the related issue or task when one exists
- If a co-authored commit with Codex is desired, include `Co-Authored-By: Codex Sonnet 4.5 <noreply@anthropic.com>`

## Git Workflow
- Remote repository: `https://github.com/JiangZaoping/ivideo.git`
- Primary branch: `master`

Common commands:

```bash
git status
git add <files>
git commit -m "描述性提交信息"
git pull
git push
```
