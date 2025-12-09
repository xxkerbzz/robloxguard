# RobloxGuard

Parental control SaaS platform that monitors children's Roblox accounts in real-time to prevent scams, unauthorized spending, and account hacking.

## Overview

RobloxGuard is a Next.js application built to help parents protect their children from Roblox fraud. The platform provides:

- Real-time account monitoring with pattern detection
- Instant SMS alerts for suspicious activity
- Transaction blocking with parent approval workflow
- Spending limits and budget controls
- Friend request approval system
- Weekly activity reports

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** Markdown with gray-matter
- **Markdown Rendering:** react-markdown

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
robloxguard/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   ├── page.tsx           # Homepage
│   └── layout.tsx          # Root layout
├── Project Files/         # Project documentation
│   └── project-document.md
├── SEO Strategy/          # SEO content and structure
│   ├── 01. Topical Map.md
│   ├── 02. Core Pages.yaml
│   ├── 03. Supporting Pages.yaml
│   └── content/           # Markdown content files
└── public/                # Static assets
```

## Build

```bash
npm run build
```

## Deployment

This project is ready to deploy on Vercel or any Next.js-compatible hosting platform.

## License

Private project - All rights reserved.

