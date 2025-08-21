import { useEffect, useRef, useState } from 'react'
import { PROJECTS_DATA, ProjectData } from '../../data/projectsData'
import { TileTemplates } from '../../components/portfolio/TileTemplates'
import { ProjectSidebar } from '../../components/portfolio/ProjectSidebar'
import { ProjectHeader } from '../../components/portfolio/ProjectHeader'
import { ProjectInfo } from '../../components/portfolio/ProjectInfo'
import { GridGallery } from '../../components/portfolio/GridGallery'
import { ThreeDFoldGallery } from '../../components/portfolio/ThreeDFoldGallery'
import ThreeDFoldGalleryLight from '../../components/portfolio/ThreeDFoldGalleryLight'
import './../../components/portfolio/styles/portfolio-layout.css'
import './../../components/portfolio/styles/gallery-3d.css'
import './../../components/portfolio/styles/tiles.css'


export default function PortfolioInfiniteScroll() {
  const [currentProject, setCurrentProject] = useState(PROJECTS_DATA[0])
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'fold' | 'grid'>('fold')
  // Toggle between old 3D (infinite) vs Light snapshot (working extract)
  const [useLightFold, setUseLightFold] = useState<boolean>(true)


  // Add this useEffect to your PortfolioInfiniteScroll component
  useEffect(() => {
    // Hide the main app footer when this page loads
    document.body.classList.add('portfolio-infinite-active');
    
    // Get the main app footer and hide it
    const footer = document.querySelector('footer');
    if (footer) {
      (footer as HTMLElement).style.display = 'none';
    }
    
    return () => {
      // Show footer again when leaving this page
      document.body.classList.remove('portfolio-infinite-active');
      if (footer) {
        (footer as HTMLElement).style.display = '';
      }
    };
  }, []);

  const switchProject = (index: number) => {
    setActiveProjectIndex(index)
    setCurrentProject(PROJECTS_DATA[index])
  }

  return (
    <div className="portfolio-wrapper">

      {/* Main grouped container */}
      <div className="portfolio-container">
        {/* Left Sidebar */}
        <ProjectSidebar 
          projects={PROJECTS_DATA}
          activeIndex={activeProjectIndex}
          onProjectChange={switchProject}
        />

        {/* Main Content */}
        <main className="main-content">
          {/* Project Header with Title and Toggle */}
          <ProjectHeader
            title={currentProject.name}
            viewMode={viewMode}
            onViewChange={setViewMode}
            useLightFold={useLightFold}
            onLightFoldChange={setUseLightFold}
          />

          {/* Conditional Rendering based on view mode */}
          {viewMode === 'fold' ? (
            useLightFold ? (
              // ✅ Working snapshot from /dev/portfolio-light
              <ThreeDFoldGalleryLight />
            ) : (
              // 🔁 Keep the legacy/infinite 3D path intact for quick rollback
              <ThreeDFoldGallery project={currentProject} />
            )
          ) : (
            /* Grid View - Using your existing tile templates */
            <GridGallery project={currentProject} />
          )}

          {/* Bottom Info Section */}
          <ProjectInfo project={currentProject} />
        </main>
      </div>
    </div>
  )
}

