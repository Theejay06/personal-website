import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { profile } from '../data/profile'
import { SocialLinks } from './Shared'

export default function Hero() {
  const reduced = useReducedMotion()
  const portrait = useRef<HTMLElement>(null)
  const codeFragments = ['01', '{ AI }', '</>', '101', 'API', 'if()', '[ ]', 'n8n']
  const movePortraitLight = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }
  const entry = (delay: number) => ({ initial: reduced ? false as const : { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: reduced ? 0 : 0.65, delay: reduced ? 0 : delay } })
  return <section id="home" aria-labelledby="hero-title" className="hero container">
    <div className="hero-grid">
      <div className="hero-copy">
        <motion.p {...entry(0)} className="eyebrow intro-label"><span aria-hidden="true" />A PERSONAL PORTFOLIO</motion.p>
        <motion.h1 {...entry(0.08)} id="hero-title">Theejay<br />Tagama<span className="accent">.</span></motion.h1>
        <motion.p {...entry(0.16)} className="hero-role">Computer Science Student<br /><span>& Aspiring AI Engineer</span></motion.p>
        <motion.p {...entry(0.24)} className="hero-description">I explore AI, build automation workflows, and turn everyday problems into practical solutions.</motion.p>
        <motion.div {...entry(0.32)} className="hero-actions"><a href="#work" className="button">View my work <ArrowRight size={17} /></a><a href="#contact" className="text-link">Get in touch <ArrowRight size={17} /></a></motion.div>
        <motion.div {...entry(0.4)}><SocialLinks /><a className="text-link resume-link" href={`${import.meta.env.BASE_URL}documents/theejay-tagama-resume.pdf`} download>Download resume <ArrowDown size={15} aria-hidden="true" /></a></motion.div>
      </div>
      <motion.figure ref={portrait} {...entry(0.4)} className="portrait" onPointerMove={movePortraitLight} onPointerLeave={() => { portrait.current?.style.removeProperty('--pointer-x'); portrait.current?.style.removeProperty('--pointer-y') }}>
        <div className="portrait-frame">
          {profile.portrait ? <img src={profile.portrait} alt="Theejay Tagama" fetchPriority="high" /> : <div className="portrait-placeholder"><span className="eyebrow portrait-top">THE PERSON BEHIND THE WORK</span><span className="portrait-monogram" aria-hidden="true">Tt<span>.</span></span><div className="portrait-note"><span className="small-line" aria-hidden="true" /><p>Portrait coming soon<span>A space for my photograph.</span></p></div></div>}
          <span className="portrait-shade" aria-hidden="true" />
          <span className="portrait-reticle" aria-hidden="true" />
          <span className="portrait-status" aria-hidden="true"><i /> SYSTEM / ONLINE</span>
        </div>
        <div className="code-orbit" aria-hidden="true">
          {codeFragments.map((fragment, index) => <span key={fragment} style={{ '--index': index } as CSSProperties}>{fragment}</span>)}
        </div>
        <figcaption><span>THEEJAY TAGAMA</span><span>AI & AUTOMATION</span></figcaption>
      </motion.figure>
    </div>
    <div className="hero-bottom"><span className="eyebrow">LEARNING. BUILDING. EXPLORING.</span><a href="#work" className="scroll-link">Scroll to explore <ArrowDown size={15} aria-hidden="true" /></a></div>
  </section>
}
