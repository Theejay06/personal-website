import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navigation } from '../data/profile'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const nav = useRef<HTMLElement>(null)

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 24)
      let current = ''
      for (const { id } of navigation) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 180) current = id
      }
      if (window.scrollY > 100 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact'
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  useEffect(() => {
    if (!open) return
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    const outside = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node) && !toggle.current?.contains(event.target as Node)) setOpen(false)
    }
    const media = window.matchMedia('(min-width: 1024px)')
    const resize = () => { if (media.matches) setOpen(false) }
    document.addEventListener('keydown', dismiss)
    document.addEventListener('pointerdown', outside)
    media.addEventListener('change', resize)
    return () => { document.removeEventListener('keydown', dismiss); document.removeEventListener('pointerdown', outside); media.removeEventListener('change', resize) }
  }, [open])

  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="container header-inner">
      <a href="#home" className="wordmark" onClick={() => setOpen(false)}>THEEJAY TAGAMA<span aria-hidden="true">.</span></a>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="main-navigation" aria-label="Main navigation" className={open ? 'main-nav is-open' : 'main-nav'} ref={nav} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== toggle.current) setOpen(false) }}>
        {navigation.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </div>
  </header>
}
