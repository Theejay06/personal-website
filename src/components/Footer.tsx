import { ArrowUp } from 'lucide-react'
import { navigation } from '../data/profile'

export default function Footer() {
  return <footer className="container footer"><div className="footer-top"><div><a className="wordmark" href="#home">THEEJAY TAGAMA<span aria-hidden="true">.</span></a><p>Aspiring AI Engineer / AI & Automation</p></div><nav aria-label="Footer navigation">{navigation.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav></div><div className="footer-bottom"><p>© 2026 Theejay Tagama</p><a href="#home" className="text-link">Back to top <ArrowUp size={15} aria-hidden="true" /></a></div></footer>
}
