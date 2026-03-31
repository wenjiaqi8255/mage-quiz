# Mage - 法师流派测算

## What This Is

一个法师流派测算的互动网站，包含 Landing Page（展示 27 种法师原型）和 Quiz 测试（9 道选择题确定用户属于哪种法师类型）。用户通过回答问题发现自己的法师流派，获得详细的角色描述和特征分析。

## Core Value

让用户在 9 道选择题后发现自己属于 27 种法师原型中的哪一种，获得个性化的结果展示和角色故事。

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Landing Page：展示法师流派测算的入口，包含动画效果和符文展示
- [ ] Quiz 测试：9 道选择题，每道题对应三个维度的选项（力量来源、施法方式、代价）
- [ ] 结果页面：显示测试者的法师类型、符文、描述和典型形象
- [ ] GitHub Pages 部署：静态网站部署到 GitHub Pages
- [ ] GitHub Actions CI/CD：自动化构建和部署流程

### Out of Scope

- [后端服务] — 所有计算在客户端完成，不需要服务器
- [用户数据存储] — 不保存用户测试结果
- [多语言支持] — 仅支持简体中文

## Context

**已有设计参考：**
- `mage_landing_v1.html` — 现有 Landing Page 设计（Tailwind CDN 版本）
- `mage_archetype_quiz_v3.html` — 现有 Quiz 测试实现（包含 27 种法师原型数据）

**技术背景：**
- 原版使用纯 HTML + Tailwind CDN + 内联 JavaScript
- 需要转换为 React 应用（Vite + React）
- 目标部署平台：GitHub Pages

## Constraints

- **[部署平台]**: GitHub Pages — 通过 GitHub Actions 自动化部署
- **[技术栈]**: React + Vite — 现代化前端框架，便于维护和扩展
- **[设计约束]**: 保持原有的暗色调魔法风格（深色背景、金色装饰、紫色点缀）

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React 应用结构 | 便于后续扩展和组件复用 | — Pending |
| GitHub Pages 部署 | 用户要求部署到 GitHub | — Pending |
| 保留原有视觉风格 | 保持魔法氛围和品牌一致性 | — Pending |

---
*Last updated: 2026-03-31 after initialization*