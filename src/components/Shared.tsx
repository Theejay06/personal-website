import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile'

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className="eyebrow section-label"><span>{number}</span><span aria-hidden="true">/</span>{children}</p>
}

export function ExternalLink({ href, children, className = 'text-link' }: { href?: string | null; children: ReactNode; className?: string }) {
  return href
    ? <a className={className} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /></a>
    : <span className={`${className} pending-link`} aria-disabled="true">{children}<span className="pending-label">Pending</span></span>
}

export function SocialLinks() {
  return <div className="social-links">
    <ExternalLink href={profile.github}><Github size={15} aria-hidden="true" />GitHub</ExternalLink>
    <ExternalLink href={profile.linkedin}><Linkedin size={15} aria-hidden="true" />LinkedIn</ExternalLink>
    <ExternalLink href={profile.email ? `mailto:${profile.email}` : null}><Mail size={15} aria-hidden="true" />Email</ExternalLink>
  </div>
}
