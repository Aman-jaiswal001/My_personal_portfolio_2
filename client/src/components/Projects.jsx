import { mediaUrl } from '../utils/media.js';
import api from '../api/axios.js';

export default function Projects({ isVisible, savedProjects = [] }) {
  return (
    <section className={`projects ${isVisible ? 'show-animate' : ''}`} id="projects">
      <h2 className="heading">
        My <span>Project</span>
        <span className="animate scroll" style={{ '--i': 1 }} />
      </h2>

      <div className="projects-container">
        {savedProjects.length ? savedProjects.map((project) => (
          <div className="project-card" key={project._id || project.title}>
            <img src={mediaUrl(project.image)} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-links">
              <a href={project.live} target="_blank" rel="noreferrer" id="liveBtn" className="btn btn-outline">Live</a>
              <a href={project.code} target="_blank" rel="noreferrer" className="btn btn-outline">Code</a>
            </div>
          </div>
        )) : <p className="empty-state">No projects uploaded yet.</p>}
      </div>
    </section>
  );
}
