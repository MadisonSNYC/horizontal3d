import React from 'react';

interface ProjectHeaderProps {
  title: string;
  viewMode: 'fold' | 'grid';
  onViewChange: (mode: 'fold' | 'grid') => void;
  useLightFold?: boolean;
  onLightFoldChange?: (value: boolean) => void;
}

export function ProjectHeader({ 
  title, 
  viewMode, 
  onViewChange,
  useLightFold,
  onLightFoldChange 
}: ProjectHeaderProps) {
  return (
    <div className="project-header">
      <h1 className="project-title">{title}</h1>
      <div className="view-toggle">
        <button 
          className={viewMode === 'fold' ? 'active' : ''}
          onClick={() => onViewChange('fold')}
        >
          3D FOLD
        </button>
        <button 
          className={viewMode === 'grid' ? 'active' : ''}
          onClick={() => onViewChange('grid')}
        >
          GRID
        </button>
        
        {/* Dev toggle: remove later */}
        {onLightFoldChange && (
          <div style={{ display: "inline-flex", gap: 8, marginLeft: 12 }}>
            <label style={{ fontSize: 10, letterSpacing: '0.08em', color: '#666' }}>
              LIGHT 3D
              <input
                type="checkbox"
                checked={useLightFold}
                onChange={e => onLightFoldChange(e.target.checked)}
                style={{ marginLeft: 6 }}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}