# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm install` - Install dependencies
- `npm run dev` - Start development server on port 9000
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Architecture

This is a React 18 component library featuring a 3D fold gallery with smooth scrolling animations. The project structure centers around:

### Core Components
- **ThreeDFoldGalleryLight** (`src/components/portfolio/ThreeDFoldGalleryLight.tsx`) - Main standalone component, self-contained with styles and tile templates. This is the primary working implementation extracted from `/dev/portfolio-light`.
- **ThreeDFoldGallery** (`src/components/portfolio/ThreeDFoldGallery.tsx`) - Alternative implementation that accepts ProjectData props and uses external TileTemplates

### Key Features
- 3D fold effect with 4 visible panels using CSS transforms
- Smooth wheel-based scrolling with animation frames
- 45vw panel width for responsive design  
- 5 tile types: hero, summary, video, image, stats
- Navigation controls (Previous/Next buttons)

### Styling Approach
- ThreeDFoldGalleryLight uses inline styles within the component
- ThreeDFoldGallery uses external CSS files in `src/components/portfolio/styles/`
- Both implementations use CSS 3D transforms for the fold effect

### Data Structure
Projects use a tiles array with each tile having:
- `type`: Template type (hero, summary, video, image, stats)
- `data`: Content specific to the tile type

## Development Notes

- The project uses Vite as the build tool with React plugin
- No TypeScript config file exists; Vite handles TS compilation
- No test framework is currently configured
- Port 9000 is configured for the dev server in vite.config.ts