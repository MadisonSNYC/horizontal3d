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

// Tile data with multiple rows for scrolling
const SAMPLE_PROJECT = {
  tiles: [
    // Row 1
    { id: 1, title: 'BERLIN 1', color: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' },
    { id: 2, title: 'TOKYO 1', color: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)' },
    { id: 3, title: 'NEW YORK 1', color: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' },
    
    // Row 2
    { id: 4, title: 'PARIS 1', color: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' },
    { id: 5, title: 'LONDON 1', color: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)' },
    { id: 6, title: 'MILAN 1', color: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' },
    
    // Row 3
    { id: 7, title: 'DUBAI 1', color: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)' },
    { id: 8, title: 'SYDNEY 1', color: 'linear-gradient(135deg, #c026d3 0%, #9333ea 100%)' },
    { id: 9, title: 'MOSCOW 1', color: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)' },
    
    // Row 4
    { id: 10, title: 'BERLIN 2', color: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' },
    { id: 11, title: 'TOKYO 2', color: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)' },
    { id: 12, title: 'NEW YORK 2', color: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' },
    
    // Row 5
    { id: 13, title: 'PARIS 2', color: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' },
    { id: 14, title: 'LONDON 2', color: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)' },
    { id: 15, title: 'MILAN 2', color: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' },
  ]
}

export default function PerspectiveGallery() {
  const scrollPositionRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentTileIndex, setCurrentTileIndex] = useState(0)
  
  // Dev controls state
  const [settings, setSettings] = useState<PerspectiveSettings>({
    perspective: 2000,
    perspectiveOriginX: 50,
    perspectiveOriginY: 50,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0
  })

  const [rowSettings, setRowSettings] = useState<{ topBottom: RowSettings; middle: RowSettings }>({
    topBottom: { translateZ: 50, rotateX: 15, rotateY: 0, scale: 0.98 },
    middle: { translateZ: 100, rotateX: 0, rotateY: 0, scale: 1.0 }
  })

  const [spacingSettings, setSpacingSettings] = useState<SpacingSettings>({
    rowGap: 4,
    colGap: 10,
    topRowHeight: 33,
    middleRowHeight: 34,
    bottomRowHeight: 33,
    containerWidth: 90,
    containerHeight: 85
  })
  
  const [tileSize, setTileSize] = useState(400) // Base tile max-width
  
  // Panel visual settings
  const [panelVisuals, setPanelVisuals] = useState({
    panelGap: 0,
    topShadow: 15,
    middleShadow: 20,
    bottomShadow: 8,
    topOpacity: 1,
    middleOpacity: 1,
    bottomOpacity: 1,
    panelBackground: 'transparent'
  })

  const updateSetting = (key: keyof PerspectiveSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const updateRowSetting = (row: 'topBottom' | 'middle', key: keyof RowSettings, value: number) => {
    setRowSettings(prev => ({
      ...prev,
      [row]: { ...prev[row], [key]: value }
    }))
  }

  const updateSpacingSetting = (key: keyof SpacingSettings, value: number) => {
    setSpacingSettings(prev => ({ ...prev, [key]: value }))
  }

  // Initialize 3D fold effect (exact pattern from original)
  useEffect(() => {
    console.log('🎯 Initializing 3D Fold Gallery (Based on Original)')
    
    setTimeout(() => {
      const wrapper = document.getElementById("fold-wrapper")
      if (!wrapper) return

      const panels = wrapper.querySelectorAll('.fold-panel')
      const totalRows = Math.ceil(SAMPLE_PROJECT.tiles.length / 3)
      const rowHeight = 200 // Approximate height of each row
      const scrollPerRow = rowHeight

      let currentScroll = 0
      let targetScroll = 0
      let animationFrame: number

      const updateScroll = (position: number) => {
        panels.forEach((panel, index) => {
          const content = panel.querySelector('.fold-content') as HTMLElement
          if (content) {
            // All panels scroll in sync but with their initial offsets
            content.style.transform = `translateY(${-position}px)`
          }
        })
        
        scrollPositionRef.current = position
        setCurrentTileIndex(Math.floor(position / scrollPerRow))
      }

      const animate = () => {
        const maxScroll = Math.max(0, (totalRows - 1) * scrollPerRow)
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
        targetScroll += scrollPerRow
      }

      window.prevTile = () => {
        targetScroll -= scrollPerRow
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
          background: #000;
          overflow: hidden;
          position: relative;
        }
        
        /* Gallery viewport */
        .gallery-viewport {
          width: 100%;
          height: 100vh;
          position: relative;
          background: #000;
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
          width: ${spacingSettings.containerWidth}%;
          height: ${spacingSettings.containerHeight}%;
          perspective: ${settings.perspective}px;
          perspective-origin: ${settings.perspectiveOriginX}% ${settings.perspectiveOriginY}%;
          transform-style: preserve-3d;
          transform: translate(-50%, -50%) 
                     rotateX(${settings.rotateX}deg)
                     rotateY(${settings.rotateY}deg)
                     rotateZ(${settings.rotateZ}deg);
        }
        
        /* 3D fold panels (updated for vertical scroll) */
        .fold-panel {
          position: absolute;
          width: 100%;
          overflow: hidden;
          left: 0;
          background: ${panelVisuals.panelBackground};
          border: none;
        }
        
        /* Individual panel sizes */
        .fold-panel-0 {
          height: ${spacingSettings.topRowHeight}%;
        }
        
        .fold-panel-1 {
          height: ${spacingSettings.middleRowHeight}%;
        }
        
        .fold-panel-2 {
          height: ${spacingSettings.bottomRowHeight}%;
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
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: minmax(150px, auto);
          column-gap: ${spacingSettings.colGap}px;
          row-gap: ${spacingSettings.rowGap}px;
          padding: 15px;
          box-sizing: border-box;
          place-items: center;
        }
        
        /* Middle panel gets proportionally scaled spacing to maintain gaps with larger tiles */
        .fold-panel-1 .tile-wrapper {
          column-gap: ${spacingSettings.colGap * rowSettings.middle.scale}px;
          row-gap: ${spacingSettings.rowGap * rowSettings.middle.scale}px;
        }
        
        /* Seamless 3D fold effect with smooth transitions */
        .fold-panel-0 {
          top: 0;
          transform-origin: bottom center;
          transform: translate3d(0, 0, ${rowSettings.topBottom.translateZ}px) 
                     rotateX(${rowSettings.topBottom.rotateX}deg)
                     scale(${rowSettings.topBottom.scale});
          z-index: 1;
          opacity: ${panelVisuals.topOpacity};
        }
        
        .fold-panel-1 {
          top: ${spacingSettings.topRowHeight}%;
          transform-origin: center center;
          transform: translate3d(0, 0, ${rowSettings.middle.translateZ}px)
                     rotateX(${rowSettings.middle.rotateX}deg)
                     scale(${rowSettings.middle.scale});
          z-index: 2;
          opacity: ${panelVisuals.middleOpacity};
        }
        
        .fold-panel-2 {
          top: ${spacingSettings.topRowHeight + spacingSettings.middleRowHeight}%;
          transform-origin: top center;
          transform: translate3d(0, 0, ${rowSettings.topBottom.translateZ}px) 
                     rotateX(-${rowSettings.topBottom.rotateX}deg)
                     scale(${rowSettings.topBottom.scale});
          z-index: 1;
          opacity: ${panelVisuals.bottomOpacity};
        }
        
        /* Initial content offsets for proper alignment */
        .fold-panel-0 .fold-content { 
          /* Top panel starts at row 1 */
          margin-top: 0;
        }
        
        .fold-panel-1 .fold-content { 
          /* Middle panel starts showing row 2 */
          margin-top: -200px;
        }
        
        .fold-panel-2 .fold-content { 
          /* Bottom panel starts showing row 3 */
          margin-top: -400px;
        }
        
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
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          color: white;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          aspect-ratio: 16 / 9;  /* Video format */
          width: 100%;
          max-width: ${tileSize}px;
          justify-self: center;
          transform-origin: center center;
        }
        
        /* Tiles maintain consistent size across panels for seamless flow */
        .fold-panel-0 .tile-3d,
        .fold-panel-1 .tile-3d,
        .fold-panel-2 .tile-3d {
          max-width: ${tileSize}px;
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
        
        /* Control Panel */
        .control-panel {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 20px;
          z-index: 1000;
          color: white;
          font-size: 11px;
          width: 320px;
          max-height: 90vh;
          overflow-y: auto;
          backdrop-filter: blur(10px);
        }
        
        .control-panel h3 {
          margin: 0 0 15px 0;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #0066ff;
        }
        
        .control-panel h4 {
          margin: 15px 0 10px 0;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #00ccff;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .control-group {
          margin-bottom: 12px;
        }
        
        .control-group label {
          display: block;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          opacity: 0.8;
          font-size: 10px;
        }
        
        .control-group input[type="range"] {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          -webkit-appearance: none;
          border-radius: 2px;
        }
        
        .control-group input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          background: #0066ff;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .control-value {
          display: inline-block;
          margin-left: 8px;
          color: #0066ff;
          font-weight: bold;
        }
      `}</style>

      <div ref={containerRef} className="perspective-container">
        {/* 3D Fold Gallery */}
        <div className="gallery-viewport">
          <div id="fold-wrapper">
            {[0, 1, 2].map(panelIndex => (
              <div key={panelIndex} className={`fold-panel fold-panel-${panelIndex}`}>
                <div className="fold-content">
                  <div className="tile-wrapper">
                    {/* Single 3x3 grid of tiles */}
                    {SAMPLE_PROJECT.tiles.map((tile, index) => (
                      <div
                        key={`tile-${index}`}
                        className="tile-3d"
                        style={{ 
                          '--tile-color': tile.color
                        } as React.CSSProperties}
                      >
                        {tile.title}
                      </div>
                    ))}
                  </div>
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
            Row {currentTileIndex + 1} of {Math.ceil(SAMPLE_PROJECT.tiles.length / 3)}
          </span>
          <button className="control-btn" onClick={() => window.nextTile?.()}>
            NEXT →
          </button>
        </div>
        
        {/* Control Panel */}
        <div className="control-panel">
          <h3>3D Perspective Controls</h3>
          
          <h4>Global Perspective</h4>
          <div className="control-group">
            <label>
              Perspective
              <span className="control-value">{settings.perspective}px</span>
            </label>
            <input
              type="range"
              min="200"
              max="3000"
              value={settings.perspective}
              onChange={(e) => updateSetting('perspective', Number(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Origin X
              <span className="control-value">{settings.perspectiveOriginX}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.perspectiveOriginX}
              onChange={(e) => updateSetting('perspectiveOriginX', Number(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Origin Y
              <span className="control-value">{settings.perspectiveOriginY}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.perspectiveOriginY}
              onChange={(e) => updateSetting('perspectiveOriginY', Number(e.target.value))}
            />
          </div>
          
          <h4>Top/Bottom Panels</h4>
          <div className="control-group">
            <label>
              Rotate X
              <span className="control-value">{rowSettings.topBottom.rotateX}°</span>
            </label>
            <input
              type="range"
              min="-90"
              max="90"
              value={rowSettings.topBottom.rotateX}
              onChange={(e) => updateRowSetting('topBottom', 'rotateX', Number(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Translate Z
              <span className="control-value">{rowSettings.topBottom.translateZ}px</span>
            </label>
            <input
              type="range"
              min="-300"
              max="300"
              value={rowSettings.topBottom.translateZ}
              onChange={(e) => updateRowSetting('topBottom', 'translateZ', Number(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Scale
              <span className="control-value">{rowSettings.topBottom.scale.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.01"
              value={rowSettings.topBottom.scale}
              onChange={(e) => updateRowSetting('topBottom', 'scale', Number(e.target.value))}
            />
          </div>
          
          <h4>Middle Panel</h4>
          <div className="control-group">
            <label>
              Rotate X
              <span className="control-value">{rowSettings.middle.rotateX}°</span>
            </label>
            <input
              type="range"
              min="-90"
              max="90"
              value={rowSettings.middle.rotateX}
              onChange={(e) => updateRowSetting('middle', 'rotateX', Number(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Translate Z
              <span className="control-value">{rowSettings.middle.translateZ}px</span>
            </label>
            <input
              type="range"
              min="-300"
              max="300"
              value={rowSettings.middle.translateZ}
              onChange={(e) => updateRowSetting('middle', 'translateZ', Number(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Scale
              <span className="control-value">{rowSettings.middle.scale.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.01"
              value={rowSettings.middle.scale}
              onChange={(e) => updateRowSetting('middle', 'scale', Number(e.target.value))}
            />
          </div>
          
          <h4>Tile Settings</h4>
          <div className="control-group">
            <label>
              Tile Size
              <span className="control-value">{tileSize}px</span>
            </label>
            <input
              type="range"
              min="200"
              max="600"
              value={tileSize}
              onChange={(e) => setTileSize(Number(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Row Gap
              <span className="control-value">{spacingSettings.rowGap}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="30"
              value={spacingSettings.rowGap}
              onChange={(e) => updateSpacingSetting('rowGap', Number(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Column Gap
              <span className="control-value">{spacingSettings.colGap}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="30"
              value={spacingSettings.colGap}
              onChange={(e) => updateSpacingSetting('colGap', Number(e.target.value))}
            />
          </div>
          
          <h4>Panel Visual Effects</h4>
          <div className="control-group">
            <label>
              Panel Gap
              <span className="control-value">{panelVisuals.panelGap}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={panelVisuals.panelGap}
              onChange={(e) => setPanelVisuals(prev => ({ ...prev, panelGap: Number(e.target.value) }))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Top Shadow
              <span className="control-value">{panelVisuals.topShadow}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={panelVisuals.topShadow}
              onChange={(e) => setPanelVisuals(prev => ({ ...prev, topShadow: Number(e.target.value) }))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Middle Shadow
              <span className="control-value">{panelVisuals.middleShadow}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={panelVisuals.middleShadow}
              onChange={(e) => setPanelVisuals(prev => ({ ...prev, middleShadow: Number(e.target.value) }))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Bottom Shadow
              <span className="control-value">{panelVisuals.bottomShadow}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={panelVisuals.bottomShadow}
              onChange={(e) => setPanelVisuals(prev => ({ ...prev, bottomShadow: Number(e.target.value) }))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Top Opacity
              <span className="control-value">{panelVisuals.topOpacity.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={panelVisuals.topOpacity}
              onChange={(e) => setPanelVisuals(prev => ({ ...prev, topOpacity: Number(e.target.value) }))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Middle Opacity
              <span className="control-value">{panelVisuals.middleOpacity.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={panelVisuals.middleOpacity}
              onChange={(e) => setPanelVisuals(prev => ({ ...prev, middleOpacity: Number(e.target.value) }))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Bottom Opacity
              <span className="control-value">{panelVisuals.bottomOpacity.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={panelVisuals.bottomOpacity}
              onChange={(e) => setPanelVisuals(prev => ({ ...prev, bottomOpacity: Number(e.target.value) }))}
            />
          </div>
          
          <h4>Panel Sizing</h4>
          <div className="control-group">
            <label>
              Top Panel Height
              <span className="control-value">{spacingSettings.topRowHeight}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="40"
              value={spacingSettings.topRowHeight}
              onChange={(e) => updateSpacingSetting('topRowHeight', Number(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Middle Panel Height
              <span className="control-value">{spacingSettings.middleRowHeight}%</span>
            </label>
            <input
              type="range"
              min="30"
              max="70"
              value={spacingSettings.middleRowHeight}
              onChange={(e) => updateSpacingSetting('middleRowHeight', Number(e.target.value))}
            />
          </div>
          
          <div className="control-group">
            <label>
              Bottom Panel Height
              <span className="control-value">{spacingSettings.bottomRowHeight}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="40"
              value={spacingSettings.bottomRowHeight}
              onChange={(e) => updateSpacingSetting('bottomRowHeight', Number(e.target.value))}
            />
          </div>
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