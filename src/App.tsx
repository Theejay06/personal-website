import { MotionConfig } from 'motion/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return <MotionConfig reducedMotion="user"><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main" tabIndex={-1}><Hero /><Projects /><About /><Skills /><Certifications /><Education /><Contact /></main><Footer /></MotionConfig>
}
