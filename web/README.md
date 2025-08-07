# Perplexica AI - Refactored Web Client

## Overview
This is a completely refactored version of the Perplexica AI web client following modern React and TypeScript best practices. The application now features a premium gray and golden theme with enhanced UI/UX and better code organization.

## 🚀 Key Improvements

### Code Structure & Best Practices
- **TypeScript Integration**: Full TypeScript support with proper type definitions
- **Custom Hooks**: Chat functionality extracted into `useChat` hook for better separation of concerns
- **Utility Functions**: API handling logic moved to dedicated utility files
- **Component Architecture**: Modular, reusable components with proper prop typing
- **Error Handling**: Comprehensive error boundary implementation
- **Code Organization**: Clear separation between types, hooks, components, and utilities

### UI/UX Enhancements
- **Premium Theme**: Gray and golden color scheme for a premium feel
- **Markdown Support**: Full markdown rendering for AI responses with syntax highlighting
- **Responsive Design**: Better responsive layout with improved mobile experience
- **Loading States**: Enhanced loading animations and indicators
- **Accessibility**: Improved focus states and keyboard navigation
- **Premium Animations**: Smooth transitions and micro-interactions

### Features
- **Real-time Streaming**: Enhanced EventSource handling for chat streaming
- **Search Visualization**: Improved search stages display with golden accents
- **Message History**: Persistent chat history with checkpoint support
- **Error Recovery**: Graceful error handling and recovery mechanisms
- **Code Highlighting**: Syntax highlighting for code blocks in responses

## 🏗️ Architecture

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

## 🎨 Design System

### Colors
- **Primary Gray**: `#374151` (gray-700)
- **Secondary Gray**: `#6b7280` (gray-500)
- **Accent Golden**: `#f59e0b` (amber-500)
- **Light Golden**: `#fbbf24` (amber-400)
- **Background**: Gradient from gray-50 to amber-50/20

### Typography
- **Font**: Inter (clean, modern sans-serif)
- **Headings**: Semibold weights with golden accents
- **Body**: Regular weight with proper line height
- **Code**: Monospace with syntax highlighting

## 🛠️ Development

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
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

### Dependencies
- **React 19**: Latest React with concurrent features
- **Next.js 15**: App router and modern React features
- **TypeScript 5**: Full type safety
- **Tailwind CSS 4**: Utility-first styling
- **react-markdown**: Markdown rendering
- **rehype-highlight**: Code syntax highlighting
- **remark-gfm**: GitHub Flavored Markdown

## 📱 Features

### Chat Interface
- Real-time message streaming
- Markdown support in AI responses
- Search stage visualization
- Loading states and animations
- Error handling and recovery

### Search Integration
- Visual search progress indicators
- URL display for sources
- Error state handling
- Retry mechanisms

### Responsive Design
- Mobile-first approach
- Flexible layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔄 Migration Notes

### From Previous Version
- All functionality preserved
- Enhanced error handling
- Better TypeScript support
- Improved performance
- Premium UI design

### Breaking Changes
- None - all existing functionality maintained
- API compatibility preserved
- Environment variables unchanged

## 🚀 Performance

### Optimizations
- Code splitting with Next.js
- Lazy loading of components
- Optimized bundle size
- Efficient re-rendering with React hooks
- Proper memoization where needed

## 📝 Changelog

### Version 2.0.0 (Current)
- Complete refactor with TypeScript
- Premium gray and golden theme
- Markdown support for AI responses
- Enhanced error handling
- Improved code organization
- Better accessibility
- Modern React patterns
- Performance optimizations

---

## 🤝 Contributing

When contributing to this project, please:
1. Follow the established TypeScript patterns
2. Maintain the premium design system
3. Add proper type definitions
4. Include error handling
5. Write clean, documented code
6. Test across different screen sizes
7. Ensure accessibility compliance
