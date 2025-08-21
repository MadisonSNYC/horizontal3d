import React from 'react';
import { ProjectData } from '../../data/projectsData';

interface ProjectInfoProps {
  project: ProjectData;
}

export function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <div className="info-section">
      <div className="info-box">
        <div className="info-label">Team</div>
        <div className="team-list">
          {project.team.slice(0, 3).map((member, i) => (
            <div key={i}>{member}</div>
          ))}
          {project.team.length > 3 && (
            <div>+{project.team.length - 3} more</div>
          )}
        </div>
      </div>

      <div className="info-box">
        <div className="info-label">Overview</div>
        <p className="overview-text">{project.overview}</p>
      </div>

      <div className="info-box">
        <div className="info-label">Services</div>
        <div className="service-pills">
          {project.services.map((service, i) => (
            <span key={i} className="service-pill">{service}</span>
          ))}
        </div>
      </div>

      <div className="info-box">
        <div className="info-label">Recognition</div>
        {project.awards.slice(0, 2).map((award, i) => (
          <div key={i} className="recognition-item">{award}</div>
        ))}
      </div>
    </div>
  );
}