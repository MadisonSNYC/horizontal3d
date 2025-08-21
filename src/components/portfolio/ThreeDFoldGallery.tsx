import React, { useEffect, useRef, useState } from 'react';
import { ProjectData } from '../../data/projectsData';
import { TileTemplates } from './TileTemplates';

interface ThreeDFoldGalleryProps {
  project: ProjectData;
}

// Add window interface extension
declare global {
  interface Window {
    nextTile?: () => void;
    prevTile?: () => void;
  }
}

export function ThreeDFoldGallery({ project }: ThreeDFoldGalleryProps) {
  // Move ALL refs and state related to 3D gallery
  const scrollPositionRef = useRef(0);
  const [currentTileIndex, setCurrentTileIndex] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);

  // Move the ENTIRE useEffect with scroll logic
  useEffect(() => {
    console.log('🎯 Initializing Infinite Scroll Portfolio')
    
    // Reset to first tile when project changes
    scrollPositionRef.current = 0
    setCurrentTileIndex(0)
    
    const wrapper = document.getElementById("fold-wrapper-infinite")
    if (!wrapper) return

    const panels = wrapper.querySelectorAll('.fold-panel-infinite')
    const totalTiles = project.tiles.length
    // Calculate tile width based on viewport (45vw to match CSS)
    const vw = window.innerWidth
    const tileWidth = vw * 0.45 // 45vw to match CSS tile width
    
    // Initialize each panel with proper offset
    panels.forEach((panel, index) => {
      const content = panel.querySelector('.fold-content-infinite') as HTMLElement
      if (content) {
        const initialOffset = index * tileWidth
        content.style.transform = `translateX(${-initialOffset}px)`
      }
    })
    
    let currentScroll = 0
    let targetScroll = 0
    let animationFrame: number
    let autoScrollInterval: NodeJS.Timeout | null = null

    const updateScroll = (position: number) => {
      panels.forEach((panel, index) => {
        const content = panel.querySelector('.fold-content-infinite') as HTMLElement
        if (content) {
          // Infinite scroll - use modulo to wrap around
          const totalWidth = totalTiles * tileWidth
          const wrappedPosition = ((position % totalWidth) + totalWidth) % totalWidth
          // Each panel starts at a different tile offset
          const panelOffset = index * tileWidth
          content.style.transform = `translateX(${-(wrappedPosition + panelOffset)}px)`
        }
      })
      
      scrollPositionRef.current = position
      // Update current tile index with wrapping
      const tileIdx = Math.floor(Math.abs(position / tileWidth)) % totalTiles
      setCurrentTileIndex(tileIdx)
    }

    const animate = () => {
      const diff = targetScroll - currentScroll
      if (Math.abs(diff) > 0.1) {
        currentScroll += diff * 0.12
        updateScroll(currentScroll)
      }
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    // Auto-scroll option
    if (autoScrollEnabled) {
      autoScrollInterval = setInterval(() => {
        targetScroll += tileWidth // Move to next tile every 3 seconds
      }, 3000)
    }

    window.nextTile = () => {
      targetScroll += tileWidth
    }

    window.prevTile = () => {
      // Prevent scrolling backwards past 0
      if (targetScroll > 0) {
        targetScroll = Math.max(0, targetScroll - tileWidth)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY * 0.5
      
      // Prevent scrolling backwards past 0
      if (targetScroll + delta < 0) {
        targetScroll = 0
      } else {
        targetScroll += delta
      }
    }

    wrapper.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      cancelAnimationFrame(animationFrame)
      if (autoScrollInterval) clearInterval(autoScrollInterval)
      wrapper.removeEventListener('wheel', handleWheel)
    }
  }, [project, autoScrollEnabled])

  return (
    <>
      {/* 3D Gallery Section */}
      <div className="gallery-section">
        <div className="gallery-viewport">
          <div id="fold-wrapper-infinite">
            {[0, 1, 2, 3].map(panelIndex => {
              // Each panel shows a single tile
              const tileIndex = panelIndex % project.tiles.length
              const tile = project.tiles[tileIndex]
              
              return (
                <div key={panelIndex} className={`fold-panel-infinite fold-panel-infinite-${panelIndex}`}>
                  <div className="fold-content-infinite">
                    <div 
                      className={`tile-wrapper ${tile.type === 'summary' || tile.type === 'stats' ? 'text-tile' : ''}`}
                    >
                      <div className="tile-inner">
                        <div className="tile-content">
                          {TileTemplates[tile.type]({ data: tile.data })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Scroll indicator */}
          <div className="scroll-indicator">
            Tile {currentTileIndex + 1} / ∞
          </div>
          
          {/* Controls */}
          <div className="gallery-controls">
            <button className="control-btn" onClick={() => window.prevTile?.()}>
              ← PREV
            </button>
            <button 
              className={`control-btn ${autoScrollEnabled ? 'active' : ''}`}
              onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
            >
              AUTO
            </button>
            <span className="control-info">
              INFINITE SCROLL
            </span>
            <button className="control-btn" onClick={() => window.nextTile?.()}>
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}