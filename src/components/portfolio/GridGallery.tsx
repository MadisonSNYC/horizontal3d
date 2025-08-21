import React from 'react';
import { ProjectData } from '../../data/projectsData';
import { TileTemplates } from './TileTemplates';

interface GridGalleryProps {
  project: ProjectData;
}

export function GridGallery({ project }: GridGalleryProps) {
  return (
    <div className="grid-view">
      <div className="grid-container">
        {project.tiles.map((tile, index) => (
          <div key={index} className="grid-item">
            {TileTemplates[tile.type]({ data: tile.data })}
          </div>
        ))}
      </div>
    </div>
  );
}