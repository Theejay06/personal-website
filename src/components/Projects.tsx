import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import { Reveal, SectionLabel } from './Shared'

export default function Projects() {
  return <section id="work" className="section container" aria-labelledby="work-title"><Reveal><SectionLabel number="01">SELECTED WORK</SectionLabel><div className="section-heading"><h2 id="work-title">Selected Projects<span className="accent">.</span></h2><span className="eyebrow">A SELECTION OF MY WORK</span></div></Reveal><div>{projects.map(project => <ProjectCard key={project.id} project={project} />)}</div></section>
}
