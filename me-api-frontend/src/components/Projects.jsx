import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { API_BASE_URL } from '../config/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const fetchProjects = async (skill = '') => {
    try {
      setIsSearching(!!skill);
      setLoading(true);
      const url = skill 
        ? `${API_BASE_URL}/api/projects?skill=${encodeURIComponent(skill)}`
        : `${API_BASE_URL}/api/projects`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSearch = () => {
    fetchProjects(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsSearching(false);
    fetchProjects();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) return <LoadingSpinner message="Loading projects..." />;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="projects-container">
      {/* Header Section */}
      <div className="projects-header card">
        <h1 className="projects-title">Projects Portfolio</h1>
        <p className="projects-subtitle">
          Explore my technical projects and innovations
        </p>
        
        {/* Search Section */}
        <div className="search-container">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search by skill or technology..."
              className="search-input"
            />
            {searchTerm && (
              <button onClick={handleClear} className="clear-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {isSearching && (
          <div className="search-results-info">
            <span className="results-count">{projects.length} project(s) found for "{searchTerm}"</span>
            <button onClick={handleClear} className="show-all-button">
              Show All Projects
            </button>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="no-projects card">
          <div className="no-projects-content">
            <svg className="no-projects-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M9 19c-5 0-8-3-8-8s3-8 8-8 8 3 8 8-3 8-8 8z"></path>
              <path d="M17 17l-4.35-4.35"></path>
            </svg>
            <h3>No projects found</h3>
            <p>
              {searchTerm 
                ? `No projects match your search for "${searchTerm}". Try a different keyword.`
                : 'No projects available at the moment.'
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card card">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-index">#{(index + 1).toString().padStart(2, '0')}</div>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              {project.links && project.links.length > 0 && (
                <div className="project-links">
                  <h4 className="links-title">Links & Demos</h4>
                  <div className="links-container">
                    {project.links.map((link, linkIndex) => (
                      <a 
                        key={linkIndex} 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                        {linkIndex === 0 ? 'Repository' : linkIndex === 1 ? 'Live Demo' : `Link ${linkIndex + 1}`}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="project-footer">
                <div className="project-tech-stack">
                  {/* Extract tech stack from description */}
                  {project.description.match(/\b(React|Node\.js|MongoDB|Python|JavaScript|TypeScript|Express|Flask|Docker|AWS|API|WebSocket)\b/gi)?.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .projects-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Header Styles */
        .projects-header {
          text-align: center;
          background: linear-gradient(135deg, rgba(139, 69, 255, 0.1) 0%, rgba(199, 125, 255, 0.05) 100%);
          border: 1px solid rgba(139, 69, 255, 0.3);
          margin-bottom: 3rem;
        }

        .projects-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff 0%, #c77dff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .projects-subtitle {
          font-size: 1.25rem;
          color: #b8b8b8;
          margin-bottom: 2rem;
        }

        /* Search Styles */
        .search-container {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .search-box {
          position: relative;
          flex: 1;
          max-width: 400px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
          z-index: 1;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 1px solid rgba(139, 69, 255, 0.3);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: rgba(139, 69, 255, 0.6);
          box-shadow: 0 0 0 3px rgba(139, 69, 255, 0.1);
        }

        .search-input::placeholder {
          color: #888;
        }

        .clear-button {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .clear-button:hover {
          color: #ff6b6b;
          background: rgba(255, 107, 107, 0.1);
        }

        .search-button {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #8b45ff 0%, #c77dff 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .search-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(139, 69, 255, 0.4);
        }

        .search-results-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(139, 69, 255, 0.1);
          border-radius: 8px;
          margin-top: 1rem;
        }

        .results-count {
          color: #c77dff;
          font-weight: 600;
        }

        .show-all-button {
          padding: 0.5rem 1rem;
          background: transparent;
          color: #8b45ff;
          border: 1px solid rgba(139, 69, 255, 0.3);
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .show-all-button:hover {
          background: rgba(139, 69, 255, 0.1);
        }

        /* Projects Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(139, 69, 255, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #8b45ff, #c77dff, #8b45ff);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover::before {
          opacity: 1;
        }

        .project-card:hover {
          border-color: rgba(139, 69, 255, 0.4);
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(139, 69, 255, 0.15);
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          flex: 1;
        }

        .project-index {
          background: linear-gradient(135deg, #8b45ff 0%, #c77dff 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          flex-shrink: 0;
          margin-left: 1rem;
        }

        .project-description {
          color: #b8b8b8;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .project-links {
          margin-bottom: 1.5rem;
        }

        .links-title {
          font-size: 1rem;
          font-weight: 600;
          color: #c77dff;
          margin-bottom: 0.75rem;
        }

        .links-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .project-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: rgba(139, 69, 255, 0.1);
          border: 1px solid rgba(139, 69, 255, 0.2);
          border-radius: 6px;
          color: #c77dff;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .project-link:hover {
          background: rgba(139, 69, 255, 0.2);
          border-color: rgba(139, 69, 255, 0.4);
          transform: translateX(4px);
        }

        .project-footer {
          border-top: 1px solid rgba(139, 69, 255, 0.1);
          padding-top: 1rem;
        }

        .project-tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          background: rgba(199, 125, 255, 0.1);
          color: #c77dff;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(199, 125, 255, 0.2);
        }

        /* No Projects State */
        .no-projects {
          text-align: center;
          padding: 4rem 2rem;
        }

        .no-projects-content {
          max-width: 400px;
          margin: 0 auto;
        }

        .no-projects-icon {
          color: #888;
          margin-bottom: 1rem;
        }

        .no-projects h3 {
          color: #ffffff;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .no-projects p {
          color: #b8b8b8;
          line-height: 1.6;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .projects-title {
            font-size: 2rem;
          }

          .search-container {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box {
            max-width: none;
          }

          .search-results-info {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-header {
            flex-direction: column;
            gap: 1rem;
          }

          .project-index {
            align-self: flex-start;
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
