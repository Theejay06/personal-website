import { skills, learningFocus } from '../data/skills'
import { Reveal, SectionLabel } from './Shared'

export default function Skills() {
  return <section id="skills" className="section container" aria-labelledby="skills-title"><Reveal><SectionLabel number="03">SKILLS</SectionLabel><h2 id="skills-title">Technologies & Tools<span className="accent">.</span></h2><div className="skills-grid">{skills.map((group, index) => <div key={group.category} className="skill-group"><div className="skill-heading"><h3 className="eyebrow">{group.category}</h3><span className="skill-index">0{index + 1}</span></div><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div><div className="learning-focus"><p className="eyebrow">CURRENT LEARNING DIRECTION</p><p>{learningFocus.join(" / ")}</p></div></Reveal></section>
}
