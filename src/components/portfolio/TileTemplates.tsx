import React from 'react';

export const TileTemplates = {
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
};