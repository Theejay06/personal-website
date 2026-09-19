import { motion, useReducedMotion } from 'motion/react'
import type { Project } from '../data/projects'
import { ExternalLink, Reveal } from './Shared'

export default function ProjectCard({ project }: { project: Project }) {
  const reduced = useReducedMotion()
  return <article className="project" aria-labelledby={`project-${project.id}`}>
    <Reveal className="project-heading"><p className="eyebrow project-number">PROJECT {project.id}</p><div>{project.status && <p className="project-status eyebrow">{project.status}</p>}<h3 id={`project-${project.id}`}>{project.title}</h3>{project.description && <p className="project-description">{project.description}</p>}</div><div className="project-meta"><p className="eyebrow">MY ROLE</p><p>{project.role || 'Details to be added'}</p><div className="tech-list">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></div></Reveal>
    <motion.div className={`project-visual project-visual-${project.id}`} initial={reduced ? false : { opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7 }}>
      {project.image ? project.url ? <a className="project-preview-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live website (new tab)`}><img src={project.image} alt={project.imageAlt || `${project.shortTitle} project screenshot`} loading="lazy" width={1440} height={960} /></a> : <img src={project.image} alt={project.imageAlt || `${project.shortTitle} project screenshot`} loading="lazy" width={1440} height={960} /> : project.overview ? <div className="workflow-overview"><p className="eyebrow">WORKFLOW OVERVIEW</p><ol>{project.overview.map((step, index) => <li key={step}><span className="eyebrow">0{index + 1}</span>{step}</li>)}</ol><p>Conceptual overview / Runs locally</p></div> : <div className="project-placeholder"><span className="eyebrow visual-label">IN DEVELOPMENT</span><span className="project-placeholder-title">{project.shortTitle}<span className="accent">.</span></span><span className="visual-footer">Design phase / Gameplay preview to follow</span></div>}

    </motion.div>
    {project.details && <details className="project-details"><summary>View project details</summary><div className="project-details-content">{project.details.map(detail => <section key={detail.heading}><h4>{detail.heading}</h4><p>{detail.text}</p></section>)}</div></details>}
    {(project.url || project.github) && <div className="project-links">{project.url && <ExternalLink href={project.url}>Visit live site</ExternalLink>}{project.github && <ExternalLink href={project.github}>GitHub</ExternalLink>}</div>}
  </article>
}
