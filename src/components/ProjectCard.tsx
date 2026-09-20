import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import type { Project } from '../data/projects'
import { ExternalLink } from './Shared'

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const detailsId = useId()
  const reduced = useReducedMotion()

  return <motion.article className="project-card" aria-labelledby={`project-${project.id}`} initial={reduced ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
    <div className={`project-visual project-visual-${project.id}`}>
      {project.image ? project.url ? <a className="project-preview-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live website (new tab)`}><img src={project.image} alt={project.imageAlt || `${project.shortTitle} project screenshot`} loading="lazy" width={1440} height={960} /></a> : <img src={project.image} alt={project.imageAlt || `${project.shortTitle} project screenshot`} loading="lazy" width={1440} height={960} /> : project.overview ? <div className="workflow-overview"><p className="project-kicker">Workflow</p><ol>{project.overview.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol><p>Runs locally</p></div> : <div className="project-placeholder"><span className="project-kicker">In development</span><span className="project-placeholder-title">{project.shortTitle}</span><span className="visual-footer">Design phase · Preview to follow</span></div>}
    </div>
    <div className="project-content">
      <div className="project-topline"><span>Project {project.id}</span>{project.status && <span>{project.status}</span>}</div>
      <h3 id={`project-${project.id}`}>{project.title}</h3>
      {project.description && <p className="project-description">{project.description}</p>}
      <div className="tech-list">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
      <div className="project-actions">
        {(project.url || project.github) && <div className="project-links">{project.url && <ExternalLink href={project.url}>Live site</ExternalLink>}{project.github && <ExternalLink href={project.github}>Source</ExternalLink>}</div>}
        {project.details && <button className="details-toggle" type="button" aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded(value => !value)}>Details <motion.span animate={{ rotate: expanded ? 180 : 0 }}><ChevronDown size={16} /></motion.span></button>}
      </div>
      <AnimatePresence initial={false}>{expanded && project.details && <motion.div id={detailsId} className="project-details" initial={reduced ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 } }}><div className="project-details-content">{project.details.map(detail => <section key={detail.heading}><h4>{detail.heading}</h4><p>{detail.text}</p></section>)}</div></motion.div>}</AnimatePresence>
    </div>
  </motion.article>
}
