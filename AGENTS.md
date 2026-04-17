# Repository Guidelines

- Always respond in Chinese-simplified

## Project Structure & Module Organization
This repository is organized as a content workspace for AI video generation research and visual assets, not an application codebase.

- `docs/`: research reports and long-form reference material (`.md`, `.docx`)
- `images/`: shared image assets used across documents
- `sect01/`: section-specific generated images and working visuals
- `README.md`: minimal project entry point

Keep new research notes in `docs/` and place exported or generated images in the most relevant asset folder instead of the repository root.

## Build, Test, and Development Commands
There is no build system or automated test suite checked in today. Use lightweight validation commands before submitting changes:

- `git status`: review changed files before committing
- `rg --files`: confirm file placement and naming
- `Get-Content docs\\AI视频生成模型市场报告_2025.md`: spot-check Markdown content from PowerShell

If a future toolchain is added, document the command in `README.md` and update this guide in the same change.

## Coding Style & Naming Conventions
Prefer Markdown for editable source documents and keep prose concise, structured, and publication-ready.

- Use `#`-style Markdown headings with clear section titles
- Keep file names descriptive and stable; preserve existing Chinese titles where they reflect document subject matter
- Use lowercase directory names such as `docs` and `images`
- Avoid adding generated temp files; `.gitignore` already excludes common editor, log, and temp artifacts

## Testing Guidelines
Validation is manual for now.

- Proofread Markdown before commit
- Verify links, image references, and relative paths
- For binary deliverables such as `.docx`, confirm the exported file matches the Markdown source and opens correctly

When adding scripts or code, include a reproducible verification command and keep tests next to that code or in a dedicated `tests/` folder.

## Commit & Pull Request Guidelines
Recent history favors short, imperative summaries in Chinese, for example: `更新项目配置和文档` and `重构项目结构:将文档移至docs目录并更新项目说明`.

- Keep commit messages concise and specific to the change
- Group related content, asset, and structure updates into one commit
- In pull requests, include a short description, affected paths, and screenshots or rendered previews when document layout or imagery changes
- Link the related issue or task when one exists
