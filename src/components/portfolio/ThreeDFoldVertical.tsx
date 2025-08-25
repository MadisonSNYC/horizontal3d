import React, { useEffect, useRef, useState } from 'react'

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

// Generate sample tiles
const generateTiles = () => {
  const themes = ['BERLIN', 'TOKYO', 'NEW YORK', 'PARIS', 'LONDON', 'MILAN', 'DUBAI', 'SYDNEY', 'MOSCOW']
  const types = ['hero', 'summary', 'video', 'image', 'stats']
  
  // Generate more tiles for endless scroll
  return Array(90).fill(null).map((_, i) => ({
    type: types[i % 5],
    data: {
      title: `${themes[i % 9]} ${Math.floor(i / 9) + 1}`,
      subtitle: `Project ${i}`,
      description: `Revolutionary creative project exploring the intersection of art and technology`,
      image: `https://picsum.photos/600/800?random=${i}`,
      poster: `https://picsum.photos/600/800?random=${i + 100}`,
      url: `https://picsum.photos/600/800?random=${i + 200}`,
      caption: `Visual ${i}`,
      tags: [themes[i % 9], 'CREATIVE', '2024'],
      stats: [
        { value: Math.floor(Math.random() * 500) + '%', label: 'GROWTH' },
        { value: Math.floor(Math.random() * 100) + 'K', label: 'USERS' },
        { value: (Math.random() * 5).toFixed(1), label: 'RATING' },
        { value: Math.floor(Math.random() * 100) + '%', label: 'SUCCESS' }
      ]
    }
  }))
}

export default function ThreeDFoldVertical() {
  const [tiles] = useState(() => generateTiles())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let currentScroll = 0
    let targetScroll = 0
    let animationFrame: number

    const updateScroll = (position: number) => {
      const scrollContent = container.querySelector('.scroll-wrapper') as HTMLElement
      if (scrollContent) {
        scrollContent.style.transform = `translateY(${-position}px)`
      }
    }

    const animate = () => {
      const diff = targetScroll - currentScroll
      if (Math.abs(diff) > 0.1) {
        currentScroll += diff * 0.1
        updateScroll(currentScroll)
      }
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const maxScroll = Math.max(0, (Math.ceil(tiles.length / 9) * 420) - window.innerHeight + 200)
      targetScroll = Math.max(0, Math.min(maxScroll, targetScroll + e.deltaY * 0.5))
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    // Auto-scroll
    const autoScroll = setInterval(() => {
      const maxScroll = Math.max(0, (Math.ceil(tiles.length / 9) * 420) - window.innerHeight + 200)
      targetScroll += 0.3
      if (targetScroll > maxScroll) targetScroll = 0
    }, 30)

    return () => {
      cancelAnimationFrame(animationFrame)
      container.removeEventListener('wheel', handleWheel)
      clearInterval(autoScroll)
    }
  }, [tiles])

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: #0a0a0a;
        }
        
        /* Main container */
        .fold-container {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          overflow: hidden;
          position: fixed;
          top: 0;
          left: 0;
          perspective: 2000px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* 3x3 Grid wrapper */
        .grid-3d-wrapper {
          width: 90%;
          max-width: 1600px;
          height: 90vh;
          position: relative;
          transform-style: preserve-3d;
        }
        
        /* Scrollable content */
        .scroll-wrapper {
          position: absolute;
          width: 100%;
          will-change: transform;
          transition: none;
        }
        
        /* Single row of 9 tiles */
        .grid-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 0.7fr 1.4fr 0.7fr; /* Middle row is twice as tall */
          gap: 25px;
          width: 100%;
          height: 90vh;
          margin-bottom: 30px;
          transform-style: preserve-3d;
        }
        
        /* Individual tile container */
        .tile-container {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        
        /* Apply 3D fold effects based on row position */
        
        /* Top row - folding away/out (rotating back) */
        .tile-container:nth-child(1),
        .tile-container:nth-child(2),
        .tile-container:nth-child(3) {
          transform-origin: center top;
          transform: rotateX(-35deg) translateZ(-120px) scale(0.85);
        }
        
        /* Middle row - BIGGER and projecting forward */
        .tile-container:nth-child(4),
        .tile-container:nth-child(5),
        .tile-container:nth-child(6) {
          transform: translateZ(180px) scale(1.15);
          z-index: 5;
        }
        
        /* Bottom row - folding away/out (rotating back) */
        .tile-container:nth-child(7),
        .tile-container:nth-child(8),
        .tile-container:nth-child(9) {
          transform-origin: center bottom;
          transform: rotateX(35deg) translateZ(-120px) scale(0.85);
        }
        
        /* Individual tiles */
        .tile {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        /* Enhanced shadow for middle row */
        .tile-container:nth-child(4) .tile,
        .tile-container:nth-child(5) .tile,
        .tile-container:nth-child(6) .tile {
          box-shadow: 
            0 60px 120px rgba(0, 0, 0, 0.6),
            0 30px 60px rgba(0, 0, 0, 0.4),
            0 15px 30px rgba(0, 0, 0, 0.3),
            inset 0 0 120px rgba(255, 255, 255, 0.08);
        }
        
        /* More dimming for top/bottom rows (they're rotating out) */
        .tile-container:nth-child(1) .tile,
        .tile-container:nth-child(2) .tile,
        .tile-container:nth-child(3) .tile,
        .tile-container:nth-child(7) .tile,
        .tile-container:nth-child(8) .tile,
        .tile-container:nth-child(9) .tile {
          opacity: 0.7;
          filter: brightness(0.6) blur(0.5px);
        }
        
        /* Hover effects */
        .tile-container:hover {
          z-index: 10;
        }
        
        .tile-container:nth-child(1):hover,
        .tile-container:nth-child(2):hover,
        .tile-container:nth-child(3):hover {
          transform: rotateX(-30deg) translateZ(-80px) scale(0.9);
        }
        
        .tile-container:nth-child(4):hover,
        .tile-container:nth-child(5):hover,
        .tile-container:nth-child(6):hover {
          transform: translateZ(220px) scale(1.2);
        }
        
        .tile-container:nth-child(7):hover,
        .tile-container:nth-child(8):hover,
        .tile-container:nth-child(9):hover {
          transform: rotateX(30deg) translateZ(-80px) scale(0.9);
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
          transition: transform 0.3s ease;
        }
        
        .tile:hover .hero-bg {
          transform: scale(1.05);
        }
        
        .hero-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 30px;
          background: linear-gradient(transparent, rgba(0,0,0,0.95));
          color: white;
        }
        
        .hero-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .hero-subtitle {
          font-size: 12px;
          opacity: 0.8;
          margin-top: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .tile-summary {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 35px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: white;
        }
        
        .summary-content h2 {
          font-size: 22px;
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .summary-text {
          font-size: 14px;
          line-height: 1.7;
          opacity: 0.85;
          margin-bottom: 20px;
        }
        
        .summary-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .tag {
          padding: 5px 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 4px;
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
          opacity: 0.7;
        }
        
        .video-overlay {
          position: absolute;
          bottom: 35px;
          left: 35px;
          color: white;
        }
        
        .video-title {
          font-size: 18px;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .video-indicator {
          font-size: 36px;
          opacity: 0.9;
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
          bottom: 25px;
          left: 25px;
          right: 25px;
          color: white;
          font-size: 14px;
          text-shadow: 2px 2px 6px rgba(0,0,0,0.9);
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .tile-stats {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0066ff 0%, #0044cc 100%);
          padding: 35px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: white;
        }
        
        .stats-title {
          font-size: 20px;
          margin-bottom: 25px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-value {
          font-size: 28px;
          font-weight: bold;
        }
        
        .stat-label {
          font-size: 10px;
          opacity: 0.7;
          margin-top: 5px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        /* Edge shadows for depth */
        .fold-container::before,
        .fold-container::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 150px;
          pointer-events: none;
          z-index: 100;
        }
        
        .fold-container::before {
          top: 0;
          background: linear-gradient(to bottom, 
            rgba(10, 10, 10, 0.9) 0%, 
            transparent 100%);
        }
        
        .fold-container::after {
          bottom: 0;
          background: linear-gradient(to top, 
            rgba(10, 10, 10, 0.9) 0%, 
            transparent 100%);
        }
        
        /* Side shadows */
        .grid-3d-wrapper::before,
        .grid-3d-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          pointer-events: none;
          z-index: 50;
        }
        
        .grid-3d-wrapper::before {
          left: -50px;
          background: linear-gradient(to right, 
            rgba(10, 10, 10, 0.8) 0%, 
            transparent 100%);
        }
        
        .grid-3d-wrapper::after {
          right: -50px;
          background: linear-gradient(to left, 
            rgba(10, 10, 10, 0.8) 0%, 
            transparent 100%);
        }
      `}</style>

      <div ref={containerRef} className="fold-container">
        <div className="grid-3d-wrapper">
          <div className="scroll-wrapper">
            {/* Create multiple 3x3 grids for scrolling */}
            {Array(Math.ceil(tiles.length / 9)).fill(null).map((_, gridIndex) => (
              <div key={gridIndex} className="grid-row">
                {tiles.slice(gridIndex * 9, (gridIndex + 1) * 9).map((tile, index) => (
                  <div key={`${gridIndex}-${index}`} className="tile-container">
                    <div className="tile">
                      {TileTemplates[tile.type as keyof typeof TileTemplates]({ data: tile.data })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}