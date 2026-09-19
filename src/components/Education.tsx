import { ArrowUpRight } from 'lucide-react'
import { Reveal, SectionLabel } from './Shared'

export default function Education() {
  return <section id="education" className="section container" aria-labelledby="education-title"><Reveal><SectionLabel number="05">EDUCATION</SectionLabel><h2 id="education-title">Education<span className="accent">.</span></h2><div className="education-row"><div className="education-date"><span className="eyebrow">2024 — PRESENT</span><span>Expected graduation: 2028</span></div><div><h3>University of the East — Manila</h3><p className="degree">Bachelor of Science in Computer Science</p><p className="eyebrow coursework-label">RELEVANT COURSEWORK & AREAS</p><ul className="coursework">{['Data Structures & Algorithms', 'Operating Systems', 'Database Systems', 'Web Development', 'Information Security', 'Data Analysis'].map(item => <li key={item}>{item}</li>)}</ul></div><ArrowUpRight className="education-arrow" size={26} strokeWidth={1} aria-hidden="true" /></div></Reveal></section>
}
