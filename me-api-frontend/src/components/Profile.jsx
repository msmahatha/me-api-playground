import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <LoadingSpinner message="Loading profile data..." />;
  if (error) return <div className="error">Error: {error}</div>;
  if (!profile) return <div className="error">No profile found</div>;

  return (
    <div className="profile-container">
      {/* Hero Section */}
      <div className="hero-card card">
        <div className="hero-content">
          <div className="avatar">
            <div className="avatar-placeholder">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="hero-text">
            <h1 className="hero-name">{profile.name}</h1>
            <p className="hero-email">{profile.email}</p>
            <div className="hero-links">
              {profile.links?.github && (
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
              {profile.links?.linkedin && (
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
              {profile.links?.portfolio && (
                <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills-card card">
        <h2 className="card-title">Technical Skills</h2>
        <div className="skills-grid">
          {profile.skills.map((skill, index) => (
            <div key={index} className="skill-chip">
              <span className="skill-text">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Experience Grid */}
      <div className="grid-container">
        {/* Education Section */}
        <div className="education-card card">
          <h2 className="card-title">Education</h2>
          <div className="timeline">
            {profile.education.map((edu, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{edu.institution}</h3>
                  <p className="timeline-subtitle">{edu.degree}</p>
                  <span className="timeline-date">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="work-card card">
          <h2 className="card-title">Work Experience</h2>
          <div className="timeline">
            {profile.work.map((job, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{job.company}</h3>
                  <p className="timeline-subtitle">{job.role}</p>
                  <span className="timeline-date">{job.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Hero Section */
        .hero-card {
          background: linear-gradient(135deg, rgba(139, 69, 255, 0.1) 0%, rgba(199, 125, 255, 0.05) 100%);
          border: 1px solid rgba(139, 69, 255, 0.3);
        }

        .hero-content {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .avatar {
          flex-shrink: 0;
        }

        .avatar-placeholder {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b45ff 0%, #c77dff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          box-shadow: 0 16px 40px rgba(139, 69, 255, 0.3);
        }

        .hero-text {
          flex: 1;
        }

        .hero-name {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff 0%, #c77dff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-email {
          font-size: 1.2rem;
          color: #b8b8b8;
          margin-bottom: 1.5rem;
        }

        .hero-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(139, 69, 255, 0.3);
          border-radius: 8px;
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: rgba(139, 69, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(139, 69, 255, 0.2);
        }

        /* Skills Section */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .skill-chip {
          background: linear-gradient(135deg, rgba(139, 69, 255, 0.1) 0%, rgba(199, 125, 255, 0.05) 100%);
          border: 1px solid rgba(139, 69, 255, 0.3);
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .skill-chip::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #8b45ff, transparent);
          transition: left 0.5s ease;
        }

        .skill-chip:hover::before {
          left: 100%;
        }

        .skill-chip:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(139, 69, 255, 0.2);
          border-color: rgba(139, 69, 255, 0.5);
        }

        .skill-text {
          font-weight: 600;
          color: #ffffff;
        }

        /* Grid Layout */
        .grid-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        /* Timeline Styles */
        .timeline {
          position: relative;
          padding-left: 2rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 1rem;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #8b45ff 0%, #c77dff 100%);
        }

        .timeline-item {
          position: relative;
          margin-bottom: 2rem;
        }

        .timeline-marker {
          position: absolute;
          left: -2rem;
          top: 0.5rem;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b45ff 0%, #c77dff 100%);
          box-shadow: 0 0 0 4px rgba(139, 69, 255, 0.2);
        }

        .timeline-content {
          padding-left: 1rem;
        }

        .timeline-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .timeline-subtitle {
          color: #c77dff;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .timeline-date {
          color: #888;
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-content {
            flex-direction: column;
            text-align: center;
          }

          .hero-name {
            font-size: 2rem;
          }

          .grid-container {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
