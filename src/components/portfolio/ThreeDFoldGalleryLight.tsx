import React, { useEffect, useRef, useState } from 'react'

/**
 * Snapshot of the *working* 3D Fold (Light Variant)
 * Extracted directly from /dev/portfolio-light
 * This is a backup/versioning copy - DO NOT MODIFY
 */

// Tile Templates
const TileTemplates = {
  hero: ({ data }: { data: any }) => (
    <div className="tile-hero">
      <img src={data.image} alt={data.title} className="hero-bg" />
      <div className="hero-overlay">
        <h1 className="hero-title">{data.title}</h1>
        <p className="hero-subtitle">{data.subtitle}</p>
      </div>
    </div>
  ),
  
  summary: ({ data }: { data: any }) => (
    <div className="tile-summary">
      <div className="summary-content">
        <h2>{data.title}</h2>
        <p className="summary-text">{data.description}</p>
        <div className="summary-tags">
          {data.tags?.map((tag: string, i: number) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="summary-indicator">★</div>
    </div>
  ),
  
  video: ({ data }: { data: any }) => (
    <div className="tile-video">
      <img src={data.poster} alt={data.title} className="video-poster" />
      <div className="video-overlay">
        <div className="video-title">{data.title}</div>
        <div className="video-indicator">▶</div>
      </div>
    </div>
  ),
  
  image: ({ data }: { data: any }) => (
    <div className="tile-image">
      <img src={data.url} alt={data.caption || ''} className="image-content" />
      {data.caption && <div className="image-caption">{data.caption}</div>}
    </div>
  ),
  
  stats: ({ data }: { data: any }) => (
    <div className="tile-stats">
      <h3 className="stats-title">{data.title}</h3>
      <div className="stats-grid">
        {data.stats?.map((stat: any, i: number) => (
          <div key={i} className="stat-item">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Sample project data
const SAMPLE_PROJECT = {
  tiles: [
    {
      type: 'hero',
      data: {
        title: 'SPECTER BERLIN',
        subtitle: 'Revolutionary Fashion Platform',
        image: 'https://picsum.photos/1920/1080?random=1'
      }
    },
    {
      type: 'summary',
      data: {
        title: 'Project Overview',
        description: 'Fashion meets technology in Berlin\'s underground scene',
        tags: ['BRANDING', 'DIGITAL', 'MOTION']
      }
    },
    {
      type: 'video',
      data: {
        title: 'Brand Film',
        poster: 'https://picsum.photos/1920/1080?random=2'
      }
    },
    {
      type: 'image',
      data: {
        url: 'https://picsum.photos/1920/1080?random=3',
        caption: 'Campaign Photography'
      }
    },
    {
      type: 'stats',
      data: {
        title: 'Impact Metrics',
        stats: [
          { value: '300%', label: 'USER GROWTH' },
          { value: '45K', label: 'ACTIVE USERS' },
          { value: '92%', label: 'RETENTION' },
          { value: '4.9', label: 'APP RATING' }
        ]
      }
    }
  ]
}

export default function ThreeDFoldGalleryLight() {
  const scrollPositionRef = useRef(0)
  const [currentTileIndex, setCurrentTileIndex] = useState(0)

  // Initialize 3D fold effect
  useEffect(() => {
    console.log('🎯 Initializing Light 3D Gallery Backup')
    
    setTimeout(() => {
      const wrapper = document.getElementById("fold-wrapper-light")
      if (!wrapper) return

      const panels = wrapper.querySelectorAll('.fold-panel-light')
      const totalTiles = SAMPLE_PROJECT.tiles.length
      const scrollPerTile = 600

      let currentScroll = 0
      let targetScroll = 0
      let animationFrame: number

      const updateScroll = (position: number) => {
        panels.forEach((panel) => {
          const content = panel.querySelector('.fold-content-light') as HTMLElement
          if (content) {
            content.style.transform = `translateX(${-position}px)`
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
        /* === BEGIN CSS from /dev/portfolio-light === */
        
        /* Gallery viewport container */
        .gallery-viewport-light {
          width: 100%;
          height: 100vh;
          position: relative;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        
        #fold-wrapper-light {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 85%;
          perspective: 100vw;
          transform-style: preserve-3d;
        }
        
        /* 3D fold panels */
        .fold-panel-light {
          position: absolute;
          width: 45vw;
          height: 100%;
          overflow: hidden;
          top: 0;
          left: 0;
          background: #fff;
          box-shadow: 
            0 10px 30px rgba(0,0,0,0.15),
            0 5px 10px rgba(0,0,0,0.1);
          border: none;
        }
        
        .fold-content-light {
          display: flex;
          height: 100%;
          width: max-content;
          will-change: transform;
          transition: none;
        }
        
        .tile-wrapper {
          width: 45vw;
          height: 100%;
          flex-shrink: 0;
          display: flex;
        }
        
        /* CLEAN DEPTH - Z-axis layering */
        .fold-panel-light-0 {
          transform: translate3d(0, 0, 100px) scale(1.02);
          z-index: 4;
          box-shadow: 0 15px 40px rgba(0,0,0,0.18);
        }
        
        .fold-panel-light-1 {
          transform-origin: left center;
          transform: translate3d(100%, 0, 50px) rotateY(35deg) scale(1);
          z-index: 3;
          box-shadow: 0 12px 30px rgba(0,0,0,0.14);
        }
        
        .fold-panel-light-2 {
          transform-origin: left center;
          transform: translate3d(100%, 0, 0px) rotateY(35deg) 
                     translate3d(100%, 0, -50px) rotateY(-35deg) scale(0.98);
          z-index: 2;
          box-shadow: 0 8px 20px rgba(0,0,0,0.11);
        }
        
        .fold-panel-light-3 {
          transform-origin: left center;
          transform: translate3d(100%, 0, -100px) rotateY(35deg) 
                     translate3d(100%, 0, -100px) rotateY(-35deg)
                     translate3d(100%, 0, -150px) rotateY(-70deg) scale(0.96);
          z-index: 1;
          opacity: 0.85;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }
        
        /* Each panel shows different tiles based on offset */
        .fold-panel-light-0 .fold-content-light { margin-left: 0; }
        .fold-panel-light-1 .fold-content-light { margin-left: -45vw; }
        .fold-panel-light-2 .fold-content-light { margin-left: -90vw; }
        .fold-panel-light-3 .fold-content-light { margin-left: -135vw; }
        
        /* Gallery Controls */
        .gallery-controls-light {
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
        
        .control-btn-light {
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
        
        .control-btn-light:hover {
          background: #333;
        }
        
        .control-info-light {
          font-size: 11px;
          color: #666;
          letter-spacing: 0.05em;
        }
        
        /* Tile content styles */
        .tile-hero {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        
        .hero-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .hero-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
          color: white;
        }
        
        .hero-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }
        
        .hero-subtitle {
          font-size: 12px;
          opacity: 0.8;
          margin-top: 0.5rem;
        }
        
        .tile-summary {
          width: 100%;
          height: 100%;
          background: #f8f8f8;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        
        .summary-content h2 {
          font-size: 20px;
          margin-bottom: 1rem;
          color: #333;
        }
        
        .summary-text {
          font-size: 12px;
          line-height: 1.6;
          color: #666;
          margin-bottom: 1rem;
        }
        
        .summary-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .tag {
          padding: 4px 10px;
          background: #333;
          color: white;
          font-size: 10px;
          text-transform: uppercase;
        }
        
        .summary-indicator {
          position: absolute;
          top: 2rem;
          right: 2rem;
          font-size: 2rem;
          color: #000;
          opacity: 0.1;
        }
        
        .tile-video {
          width: 100%;
          height: 100%;
          position: relative;
          background: #000;
        }
        
        .video-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .video-overlay {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          color: white;
        }
        
        .video-title {
          font-size: 14px;
          margin-bottom: 0.5rem;
        }
        
        .video-indicator {
          font-size: 24px;
          opacity: 0.8;
        }
        
        .tile-image {
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .image-content {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .image-caption {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          color: white;
          font-size: 12px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        }
        
        .tile-stats {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        
        .stats-title {
          font-size: 18px;
          margin-bottom: 2rem;
          color: #333;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #000;
        }
        
        .stat-label {
          font-size: 10px;
          opacity: 0.6;
          margin-top: 0.25rem;
          text-transform: uppercase;
        }
        /* === END CSS === */
      `}</style>

      {/* === BEGIN HTML structure === */}
      <div className="gallery-viewport-light">
        <div id="fold-wrapper-light">
          {[0, 1, 2, 3].map(panelIndex => (
            <div key={panelIndex} className={`fold-panel-light fold-panel-light-${panelIndex}`}>
              <div className="fold-content-light">
                {SAMPLE_PROJECT.tiles.map((tile, tileIndex) => (
                  <div key={tileIndex} className="tile-wrapper">
                    {TileTemplates[tile.type as keyof typeof TileTemplates]({ data: tile.data })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Controls */}
        <div className="gallery-controls-light">
          <button className="control-btn-light" onClick={() => window.prevTile?.()}>
            ← PREVIOUS
          </button>
          <span className="control-info-light">
            Viewing tiles {currentTileIndex + 1}-{Math.min(currentTileIndex + 4, SAMPLE_PROJECT.tiles.length)} of {SAMPLE_PROJECT.tiles.length}
          </span>
          <button className="control-btn-light" onClick={() => window.nextTile?.()}>
            NEXT →
          </button>
        </div>
      </div>
      {/* === END HTML === */}
    </>
  )
}

declare global {
  interface Window {
    nextTile?: () => void
    prevTile?: () => void
  }
}