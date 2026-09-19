import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'
import { Reveal, SectionLabel, SocialLinks } from './Shared'

export default function Contact() {
  return <section id="contact" className="section contact-section" aria-labelledby="contact-title"><div className="container"><Reveal><SectionLabel number="06">CONTACT</SectionLabel><div className="contact-layout"><div><h2 id="contact-title">Let's build<br /><em>something.</em></h2><p className="contact-description">Have an internship opportunity, project, or just want to talk tech? I'd love to hear from you.</p></div><div className="contact-actions">{profile.email ? <a className="button" href={`mailto:${profile.email}`}>Send a message <ArrowUpRight size={18} /></a> : <><button className="button" disabled>Send a message <ArrowUpRight size={18} /></button><p className="contact-pending">Email address to be added.</p></>}<SocialLinks /></div></div></Reveal></div></section>
}
