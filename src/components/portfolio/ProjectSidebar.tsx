import React from 'react';
import { ProjectData } from '../../data/projectsData';

interface ProjectSidebarProps {
  projects: ProjectData[];
  activeIndex: number;
  onProjectChange: (index: number) => void;
}

export function ProjectSidebar({ 
  projects, 
  activeIndex, 
  onProjectChange 
}: ProjectSidebarProps) {
  return (
    <aside className="project-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">Project Directory</div>
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-item ${index === activeIndex ? 'active' : ''}`}
            onClick={() => onProjectChange(index)}
          >
            <div className="project-name">{project.name}</div>
            <div className="project-client">{project.client}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}