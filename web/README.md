# PerPLEX

## Overview

PerPLEX web frontend.

### Directory Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with premium theme
│   ├── layout.tsx           # Root layout with error boundary
│   └── page.tsx             # Main chat interface
├── components/
│   ├── ErrorBoundary.tsx    # Error handling component
│   ├── Header.tsx           # Premium header component
│   ├── InputBar.tsx         # Enhanced input component
│   ├── LoadingAnimation.tsx # Loading states component
│   ├── MarkdownRenderer.tsx # Markdown rendering component
│   └── MessageArea.tsx      # Message display component
├── hooks/
│   └── useChat.ts           # Chat logic custom hook
├── types/
│   └── index.ts             # TypeScript type definitions
└── utils/
    └── api.ts               # API utility functions
```

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

### Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
