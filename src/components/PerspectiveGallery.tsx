import React, { useState, useEffect, useRef } from 'react'

interface PerspectiveSettings {
  perspective: number
  perspectiveOriginX: number
  perspectiveOriginY: number
  rotateX: number
  rotateY: number
  rotateZ: number
}

interface RowSettings {
  translateZ: number
  rotateX: number
  rotateY: number
  scale: number
}

interface SpacingSettings {
  rowGap: number
  colGap: number
  topRowHeight: number
  middleRowHeight: number
  bottomRowHeight: number
  containerWidth: number
  containerHeight: number
}

interface ScrollSettings {
  autoScroll: boolean
  scrollSpeed: number
  scrollDamping: number
  momentum: boolean
}

// Tile data with 3x3 grid layout (following original pattern)
const SAMPLE_PROJECT = {
  tiles: [
    // Row 1 (Top)
    { id: 1, title: 'BERLIN 1', color: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' },
    { id: 2, title: 'TOKYO 1', color: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)' },
    { id: 3, title: 'NEW YORK 1', color: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' },
    
    // Row 2 (Middle)
    { id: 4, title: 'PARIS 1', color: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' },
    { id: 5, title: 'LONDON 1', color: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)' },
    { id: 6, title: 'MILAN 1', color: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' },
    
    // Row 3 (Bottom)
    { id: 7, title: 'DUBAI 1', color: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)' },
    { id: 8, title: 'SYDNEY 1', color: 'linear-gradient(135deg, #c026d3 0%, #9333ea 100%)' },
    { id: 9, title: 'MOSCOW 1', color: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)' }
  ]
}

export default function PerspectiveGallery() {
  const scrollPositionRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentTileIndex, setCurrentTileIndex] = useState(0)

  // Initialize 3D fold effect (exact pattern from original)
  useEffect(() => {
    console.log('🎯 Initializing 3D Fold Gallery (Based on Original)')
    
    setTimeout(() => {
      const wrapper = document.getElementById("fold-wrapper")
      if (!wrapper) return

      const panels = wrapper.querySelectorAll('.fold-panel')
      const totalTiles = SAMPLE_PROJECT.tiles.length
      const scrollPerTile = 600

      let currentScroll = 0
      let targetScroll = 0
      let animationFrame: number

      const updateScroll = (position: number) => {
        panels.forEach((panel) => {
          const content = panel.querySelector('.fold-content') as HTMLElement
          if (content) {
            content.style.transform = `translateY(${-position}px)`
          }
        })
        
        scrollPositionRef.current = position
        setCurrentTileIndex(Math.min(Math.floor(position / scrollPerTile), totalTiles - 4))
      }

      const animate = () => {
        const maxScroll = Math.max(0, (totalTiles - 4) * scrollPerTile)
        targetScroll = Math.max(0, Math.min(maxScroll, targetScroll))
        
        const diff = targetScroll - currentScroll
        if (Math.abs(diff) > 0.1) {
          currentScroll += diff * 0.12
          updateScroll(currentScroll)
        }
        animationFrame = requestAnimationFrame(animate)
      }

      animate()

      window.nextTile = () => {
        targetScroll += scrollPerTile
      }

      window.prevTile = () => {
        targetScroll -= scrollPerTile
      }

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        targetScroll += e.deltaY * 0.5
      }

      wrapper.addEventListener('wheel', handleWheel, { passive: false })

      return () => {
        cancelAnimationFrame(animationFrame)
        wrapper.removeEventListener('wheel', handleWheel)
      }
    }, 100)
  }, [])

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .perspective-container {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          overflow: hidden;
          position: relative;
        }
        
        /* Gallery viewport */
        .gallery-viewport {
          width: 100%;
          height: 100vh;
          position: relative;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        
        #fold-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 84%;
          height: 82%;
          perspective: 689px;
          transform-style: preserve-3d;
        }
        
        /* 3D fold panels (updated for vertical scroll) */
        .fold-panel {
          position: absolute;
          width: 100%;
          overflow: hidden;
          left: 0;
          background: #fff;
          box-shadow: 
            0 10px 30px rgba(0,0,0,0.15),
            0 5px 10px rgba(0,0,0,0.1);
          border: none;
        }
        
        /* Individual panel sizes */
        .fold-panel-0 {
          height: 25%;
        }
        
        .fold-panel-1 {
          height: 50%;
        }
        
        .fold-panel-2 {
          height: 25%;
        }
        
        .fold-content {
          display: block;
          height: max-content;
          width: 100%;
          will-change: transform;
          transition: none;
        }
        
        .tile-wrapper {
          width: 100%;
          height: 100vh;
          flex-shrink: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 40px;
          align-content: center;
          box-sizing: border-box;
        }
        
        /* CLEAN DEPTH - Z-axis layering */
        .fold-panel-0 {
          top: 0;
          transform: translate3d(0, 0, 50px);
          z-index: 4;
          box-shadow: 0 15px 40px rgba(0,0,0,0.18);
        }
        
        .fold-panel-1 {
          top: 25%;
          transform: translate3d(0, 0, 100px);
          z-index: 3;
          box-shadow: 0 20px 50px rgba(0,0,0,0.22);
        }
        
        .fold-panel-2 {
          top: 75%;
          transform: translate3d(0, 0, 50px);
          z-index: 2;
          box-shadow: 0 8px 20px rgba(0,0,0,0.11);
        }
        
        /* Each panel shows different content offset for seamless vertical scroll */
        .fold-panel-0 .fold-content { margin-top: 0; }
        .fold-panel-1 .fold-content { margin-top: -25vh; }
        .fold-panel-2 .fold-content { margin-top: -75vh; }
        
        /* Row containers */
        .row-container {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          justify-items: center;
          gap: 24px;
          padding: 0 20px;
        }
        
        .tile-3d {
          background: var(--tile-color);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          color: white;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          transition: transform 0.3s ease;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          aspect-ratio: 16 / 10;
          width: 100%;
          max-width: 400px;
          justify-self: center;
        }
        
        .tile-3d:hover {
          transform: scale(1.05);
        }
        
        /* Gallery Controls (matching original) */
        .gallery-controls {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(255,255,255,0.95);
          padding: 12px 24px;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .control-btn {
          padding: 10px 20px;
          background: #000;
          color: #fff;
          border: none;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .control-btn:hover {
          background: #333;
        }
        
        .control-info {
          font-size: 11px;
          color: #666;
          letter-spacing: 0.05em;
        }
      `}</style>

      <div ref={containerRef} className="perspective-container">
        {/* 3D Fold Gallery */}
        <div className="gallery-viewport">
          <div id="fold-wrapper">
            {[0, 1, 2].map(panelIndex => (
              <div key={panelIndex} className={`fold-panel fold-panel-${panelIndex}`}>
                <div className="fold-content">
                  {SAMPLE_PROJECT.tiles.map((tile, tileIndex) => (
                    <div key={tileIndex} className="tile-wrapper">
                      {/* Each tile wrapper contains 3 tiles horizontally */}
                      {[0, 1, 2].map(colIndex => (
                        <div
                          key={`tile-${colIndex}`}
                          className="tile-3d"
                          style={{ '--tile-color': SAMPLE_PROJECT.tiles[(tileIndex * 3 + colIndex) % SAMPLE_PROJECT.tiles.length]?.color || '#333' } as React.CSSProperties}
                        >
                          {SAMPLE_PROJECT.tiles[(tileIndex * 3 + colIndex) % SAMPLE_PROJECT.tiles.length]?.title || `TILE ${colIndex + 1}`}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls (matching original) */}
        <div className="gallery-controls">
          <button className="control-btn" onClick={() => window.prevTile?.()}>
            ← PREVIOUS
          </button>
          <span className="control-info">
            Viewing tiles {currentTileIndex + 1}-{Math.min(currentTileIndex + 4, SAMPLE_PROJECT.tiles.length)} of {SAMPLE_PROJECT.tiles.length}
          </span>
          <button className="control-btn" onClick={() => window.nextTile?.()}>
            NEXT →
          </button>
        </div>
      </div>
    </>
  )
}

declare global {
  interface Window {
    nextTile?: () => void
    prevTile?: () => void
  }
}