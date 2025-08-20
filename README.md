# Horizontal 3D Fold Gallery

A standalone React component featuring a beautiful 3D fold gallery with smooth scrolling animations.

## Features

- 🎨 3D fold effect with clean depth layering
- 🖱️ Smooth scroll animations with wheel support
- 📱 Responsive design (45vw panels)
- 🎯 Multiple tile types (hero, summary, video, image, stats)
- ⚡ High performance with React 18

## Component

The main component is located at:
```
src/components/portfolio/ThreeDFoldGalleryLight.tsx
```

## Demo

This component was extracted from a working portfolio site. It features:
- 4 visible panels with 3D transforms
- Smooth content scrolling
- Navigation controls (Previous/Next)
- 5 different tile templates

## Usage

```tsx
import ThreeDFoldGalleryLight from './components/portfolio/ThreeDFoldGalleryLight'

function App() {
  return <ThreeDFoldGalleryLight />
}
```

## Installation

```bash
npm install
npm run dev
```

## Original Source

Extracted from `/dev/portfolio-light` - a working 3D portfolio implementation.

## License

MIT