import React, { useState } from 'react'

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

export default function PerspectiveGallery() {
  const [settings, setSettings] = useState<PerspectiveSettings>({
    perspective: 689,
    perspectiveOriginX: 51,
    perspectiveOriginY: 49,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0
  })

  const [rowSettings, setRowSettings] = useState<{ topBottom: RowSettings; middle: RowSettings }>({
    topBottom: { translateZ: 193, rotateX: 22, rotateY: 0, scale: 0.85 }, // top uses positive rotateX, bottom uses negative
    middle: { translateZ: 94, rotateX: 0, rotateY: 0, scale: 1.50 }
  })

  const [spacingSettings, setSpacingSettings] = useState<SpacingSettings>({
    rowGap: 0,
    colGap: 24,
    topRowHeight: 21.5,
    middleRowHeight: 61.5,
    bottomRowHeight: 22.5,
    containerWidth: 84,
    containerHeight: 82
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

  // Generate sample tiles
  const tiles = Array(9).fill(null).map((_, i) => ({
    id: i,
    title: `TILE ${i + 1}`,
    color: `hsl(${i * 40}, 70%, 50%)`
  }))

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
        
        /* 3D Stage - dynamic sizing */
        .stage-3d {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
        }
        
        /* Main Grid Container - dynamic spacing */
        .main-grid {
          width: 100%;
          height: 100%;
          display: grid;
          transform-style: preserve-3d;
        }
        
        /* Row containers */
        .row-container {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        
        /* Grid for each row - dynamic column gap with proper alignment */
        .row-grid {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          transform-style: preserve-3d;
          align-items: center;
          justify-items: center;
          place-items: center;
        }
        
        /* Individual Tiles - 16:9 aspect ratio with proper grid alignment */
        .tile-3d {
          background: linear-gradient(135deg, var(--tile-color) 0%, rgba(0,0,0,0.8) 100%);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          color: white;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            inset 0 0 60px rgba(255, 255, 255, 0.1);
          aspect-ratio: 16 / 9;
          width: 100%;
          height: auto;
          align-self: center;
          justify-self: center;
        }
        
        /* Middle row tiles are visually larger */
        .row-middle .tile-3d {
          font-size: 28px;
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.4),
            inset 0 0 80px rgba(255, 255, 255, 0.15);
        }
        
        .tile-3d:hover {
          transform: translateZ(30px) scale(1.05);
          box-shadow: 
            0 35px 70px rgba(0, 0, 0, 0.5),
            inset 0 0 100px rgba(255, 255, 255, 0.2);
        }
        
        /* Info Display */
        .info-display {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 15px;
          color: white;
          font-size: 11px;
          font-family: monospace;
          backdrop-filter: blur(10px);
        }
        
        .info-display h4 {
          margin: 0 0 10px 0;
          color: #0066ff;
          font-size: 12px;
        }
        
        .info-display code {
          display: block;
          margin: 5px 0;
          opacity: 0.8;
        }
        
        /* Scrollbar styling */
        .control-panel::-webkit-scrollbar {
          width: 6px;
        }
        
        .control-panel::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .control-panel::-webkit-scrollbar-thumb {
          background: rgba(0, 102, 255, 0.5);
          border-radius: 3px;
        }
        
        .control-panel::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 102, 255, 0.7);
        }
      `}</style>

      <div className="perspective-container">
        {/* 3D Stage with dynamic perspective */}
        <div 
          className="stage-3d"
          style={{
            perspective: `${settings.perspective}px`,
            perspectiveOrigin: `${settings.perspectiveOriginX}% ${settings.perspectiveOriginY}%`,
            width: `${spacingSettings.containerWidth}%`,
            height: `${spacingSettings.containerHeight}%`
          }}
        >
          <div 
            className="main-grid"
            style={{
              transform: `
                rotateX(${settings.rotateX}deg)
                rotateY(${settings.rotateY}deg)
                rotateZ(${settings.rotateZ}deg)
              `,
              gridTemplateRows: `${spacingSettings.topRowHeight}% ${spacingSettings.middleRowHeight}% ${spacingSettings.bottomRowHeight}%`,
              gap: `${spacingSettings.rowGap}px`
            }}
          >
            {/* Top Row */}
            <div 
              className="row-container row-top"
              style={{
                transform: `
                  translateZ(${rowSettings.topBottom.translateZ}px)
                  rotateX(${rowSettings.topBottom.rotateX}deg)
                  rotateY(${rowSettings.topBottom.rotateY}deg)
                  scale(${rowSettings.topBottom.scale})
                `
              }}
            >
              <div 
                className="row-grid"
                style={{ gap: `${spacingSettings.colGap}px` }}
              >
                {tiles.slice(0, 3).map((tile) => (
                  <div
                    key={tile.id}
                    className="tile-3d"
                    style={{ '--tile-color': tile.color } as React.CSSProperties}
                  >
                    {tile.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Row */}
            <div 
              className="row-container row-middle"
              style={{
                transform: `
                  translateZ(${rowSettings.middle.translateZ}px)
                  rotateX(${rowSettings.middle.rotateX}deg)
                  rotateY(${rowSettings.middle.rotateY}deg)
                  scale(${rowSettings.middle.scale})
                `
              }}
            >
              <div 
                className="row-grid"
                style={{ gap: `${spacingSettings.colGap}px` }}
              >
                {tiles.slice(3, 6).map((tile) => (
                  <div
                    key={tile.id}
                    className="tile-3d"
                    style={{ '--tile-color': tile.color } as React.CSSProperties}
                  >
                    {tile.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row - uses same settings as top but with negative rotateX */}
            <div 
              className="row-container row-bottom"
              style={{
                transform: `
                  translateZ(${rowSettings.topBottom.translateZ}px)
                  rotateX(${-rowSettings.topBottom.rotateX}deg)
                  rotateY(${rowSettings.topBottom.rotateY}deg)
                  scale(${rowSettings.topBottom.scale})
                `
              }}
            >
              <div 
                className="row-grid"
                style={{ gap: `${spacingSettings.colGap}px` }}
              >
                {tiles.slice(6, 9).map((tile) => (
                  <div
                    key={tile.id}
                    className="tile-3d"
                    style={{ '--tile-color': tile.color } as React.CSSProperties}
                  >
                    {tile.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="control-panel">
          <h3>Global Perspective</h3>
          
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

          <div className="control-group">
            <label>
              Global Rotate X
              <span className="control-value">{settings.rotateX}°</span>
            </label>
            <input
              type="range"
              min="-60"
              max="60"
              value={settings.rotateX}
              onChange={(e) => updateSetting('rotateX', Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>
              Global Rotate Y
              <span className="control-value">{settings.rotateY}°</span>
            </label>
            <input
              type="range"
              min="-60"
              max="60"
              value={settings.rotateY}
              onChange={(e) => updateSetting('rotateY', Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>
              Global Rotate Z
              <span className="control-value">{settings.rotateZ}°</span>
            </label>
            <input
              type="range"
              min="-45"
              max="45"
              value={settings.rotateZ}
              onChange={(e) => updateSetting('rotateZ', Number(e.target.value))}
            />
          </div>

          {/* Spacing Controls */}
          <h4>Layout & Spacing</h4>
          
          <div className="control-group">
            <label>
              Container Width
              <span className="control-value">{spacingSettings.containerWidth}%</span>
            </label>
            <input
              type="range"
              min="50"
              max="100"
              value={spacingSettings.containerWidth}
              onChange={(e) => updateSpacingSetting('containerWidth', Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>
              Container Height
              <span className="control-value">{spacingSettings.containerHeight}%</span>
            </label>
            <input
              type="range"
              min="50"
              max="100"
              value={spacingSettings.containerHeight}
              onChange={(e) => updateSpacingSetting('containerHeight', Number(e.target.value))}
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
              max="60"
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
              max="60"
              value={spacingSettings.colGap}
              onChange={(e) => updateSpacingSetting('colGap', Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>
              Top Row Height
              <span className="control-value">{spacingSettings.topRowHeight}%</span>
            </label>
            <input
              type="range"
              min="15"
              max="35"
              step="0.5"
              value={spacingSettings.topRowHeight}
              onChange={(e) => updateSpacingSetting('topRowHeight', Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>
              Middle Row Height
              <span className="control-value">{spacingSettings.middleRowHeight}%</span>
            </label>
            <input
              type="range"
              min="40"
              max="70"
              step="0.5"
              value={spacingSettings.middleRowHeight}
              onChange={(e) => updateSpacingSetting('middleRowHeight', Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>
              Bottom Row Height
              <span className="control-value">{spacingSettings.bottomRowHeight}%</span>
            </label>
            <input
              type="range"
              min="15"
              max="35"
              step="0.5"
              value={spacingSettings.bottomRowHeight}
              onChange={(e) => updateSpacingSetting('bottomRowHeight', Number(e.target.value))}
            />
          </div>

          {/* Top/Bottom Row Controls (Shared) */}
          <h4>Top & Bottom Rows</h4>
          
          <div className="control-group">
            <label>
              Z Position
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
              Rotate X (Top +, Bottom -)
              <span className="control-value">{rowSettings.topBottom.rotateX}°</span>
            </label>
            <input
              type="range"
              min="-45"
              max="45"
              value={rowSettings.topBottom.rotateX}
              onChange={(e) => updateRowSetting('topBottom', 'rotateX', Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>
              Rotate Y
              <span className="control-value">{rowSettings.topBottom.rotateY}°</span>
            </label>
            <input
              type="range"
              min="-45"
              max="45"
              value={rowSettings.topBottom.rotateY}
              onChange={(e) => updateRowSetting('topBottom', 'rotateY', Number(e.target.value))}
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
              step="0.05"
              value={rowSettings.topBottom.scale}
              onChange={(e) => updateRowSetting('topBottom', 'scale', Number(e.target.value))}
            />
          </div>

          {/* Middle Row Controls */}
          <h4>Middle Row</h4>
          
          <div className="control-group">
            <label>
              Z Position
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
              Rotate X
              <span className="control-value">{rowSettings.middle.rotateX}°</span>
            </label>
            <input
              type="range"
              min="-45"
              max="45"
              value={rowSettings.middle.rotateX}
              onChange={(e) => updateRowSetting('middle', 'rotateX', Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>
              Rotate Y
              <span className="control-value">{rowSettings.middle.rotateY}°</span>
            </label>
            <input
              type="range"
              min="-45"
              max="45"
              value={rowSettings.middle.rotateY}
              onChange={(e) => updateRowSetting('middle', 'rotateY', Number(e.target.value))}
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
              step="0.05"
              value={rowSettings.middle.scale}
              onChange={(e) => updateRowSetting('middle', 'scale', Number(e.target.value))}
            />
          </div>
        </div>

        {/* Info Display */}
        <div className="info-display">
          <h4>Row Distribution:</h4>
          <code>• Top Row: 22.5% height</code>
          <code>• Middle Row: 55% height (dominant)</code>
          <code>• Bottom Row: 22.5% height</code>
          <code>• Each row has independent controls</code>
          <code>• All tiles start at Z: 0 (even spread)</code>
        </div>
      </div>
    </>
  )
}