import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { profile } from '../data/profile'
import { SocialLinks } from './Shared'

type Pixel = { x: number; y: number; vx: number; vy: number; life: number; size: number; blue: boolean }

function BinaryPortrait({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const image = new Image()
    const sample = document.createElement('canvas')
    const sampleContext = sample.getContext('2d', { willReadFrequently: true })
    if (!sampleContext) return
    const pixels: Pixel[] = []
    let frame = 0
    let hovering = false
    let pointerX = 0.5
    let pointerY = 0.5
    let width = 0
    let height = 0
    let last = 0
    let sampleSize = 0
    let sampleData: Uint8ClampedArray | null = null
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      sampleData = null
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      pointerX = (event.clientX - bounds.left) / bounds.width
      pointerY = (event.clientY - bounds.top) / bounds.height
    }
    const enter = () => { hovering = true }
    const leave = () => { hovering = false }
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerenter', enter)
    canvas.addEventListener('pointerleave', leave)

    const draw = (time: number) => {
      if (!width || !height || !image.complete) { frame = requestAnimationFrame(draw); return }
      const dt = Math.min((time - last) / 16.67 || 1, 2)
      last = time
      context.clearRect(0, 0, width, height)
      const side = Math.min(width, height) * 0.72
      const left = (width - side) / 2
      const top = (height - side) / 2
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const targetSampleSize = Math.max(220, Math.floor(side * dpr))
      if (!sampleData || sampleSize !== targetSampleSize) {
        sampleSize = targetSampleSize
        sample.width = sampleSize
        sample.height = sampleSize
        sampleContext.clearRect(0, 0, sampleSize, sampleSize)
        const scale = Math.min(sampleSize / image.naturalWidth, sampleSize / image.naturalHeight)
        const drawWidth = image.naturalWidth * scale
        const drawHeight = image.naturalHeight * scale
        sampleContext.drawImage(image, (sampleSize - drawWidth) / 2, sampleSize - drawHeight, drawWidth, drawHeight)
        sampleData = sampleContext.getImageData(0, 0, sampleSize, sampleSize).data
      }
      const data = sampleData

      const glow = context.createRadialGradient(width * .48, height * .5, 0, width * .48, height * .5, side * .7)
      glow.addColorStop(0, 'rgba(0,113,227,.13)')
      glow.addColorStop(1, 'rgba(0,113,227,0)')
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)

      const step = Math.max(7, Math.round(side / 58))
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.font = `600 ${Math.max(7, step - 1)}px ui-monospace, SFMono-Regular, Menlo, monospace`
      for (let y = step / 2; y < side; y += step) {
        for (let x = step / 2; x < side; x += step) {
          const sx = Math.min(sampleSize - 1, Math.floor(x / side * sampleSize))
          const sy = Math.min(sampleSize - 1, Math.floor(y / side * sampleSize))
          const index = (sy * sampleSize + sx) * 4
          const alpha = data[index + 3] / 255
          if (alpha < .08) continue
          const light = (data[index] * .2126 + data[index + 1] * .7152 + data[index + 2] * .0722) / 255
          const dx = left + x - pointerX * width
          const dy = top + y - pointerY * height
          const near = hovering ? Math.max(0, 1 - Math.hypot(dx, dy) / 115) : 0
          const opacity = Math.min(.92, .12 + light * .55 + near * .3) * alpha
          context.fillStyle = near > .2 ? `rgba(90,200,250,${opacity})` : `rgba(24,25,28,${opacity})`
          context.fillText(((Math.floor(x / step) + Math.floor(y / step)) % 2 ? '1' : '0'), left + x, top + y)
          if (hovering && !reduced && Math.random() < .00075 + near * .0018) {
            pixels.push({ x: left + x, y: top + y, vx: 1.2 + Math.random() * 2.8, vy: -1.8 + Math.random() * 2.4, life: 1, size: 2 + Math.random() * 6, blue: near > .25 })
          }
        }
      }

      if (hovering && !reduced) {
        for (let i = 0; i < 3; i += 1) pixels.push({ x: left + side * (.62 + Math.random() * .32), y: top + side * (.16 + Math.random() * .7), vx: 2.2 + Math.random() * 4.5, vy: -2.6 + Math.random() * 3.6, life: 1, size: 3 + Math.random() * 8, blue: Math.random() > .55 })
      }
      for (let i = pixels.length - 1; i >= 0; i -= 1) {
        const pixel = pixels[i]
        pixel.x += pixel.vx * dt
        pixel.y += pixel.vy * dt
        pixel.vx += .035 * dt
        pixel.vy -= .012 * dt
        pixel.life -= .014 * dt
        if (pixel.life <= 0) { pixels.splice(i, 1); continue }
        context.fillStyle = pixel.blue ? `rgba(0,113,227,${pixel.life})` : `rgba(25,25,28,${pixel.life * .78})`
        context.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
      }
      frame = requestAnimationFrame(draw)
    }
    image.src = src
    image.onload = () => { frame = requestAnimationFrame(draw) }
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerenter', enter)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [src])

  return <div className="binary-portrait"><canvas ref={canvasRef} aria-hidden="true" /><img className="portrait-source" src={src} alt="Theejay Tagama" fetchPriority="high" /><span className="portrait-status" aria-hidden="true"><i /> BINARY PORTRAIT / INTERACTIVE</span></div>
}

export default function Hero() {
  const reduced = useReducedMotion()
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
      <motion.figure {...entry(0.4)} className="portrait">
        {profile.portrait ? <BinaryPortrait src={profile.portrait} /> : <div className="portrait-placeholder"><span className="eyebrow portrait-top">THE PERSON BEHIND THE WORK</span><span className="portrait-monogram" aria-hidden="true">Tt<span>.</span></span><div className="portrait-note"><span className="small-line" aria-hidden="true" /><p>Portrait coming soon<span>A space for my photograph.</span></p></div></div>}
        <figcaption><span>THEEJAY TAGAMA</span><span>AI & AUTOMATION</span></figcaption>
      </motion.figure>
    </div>
    <div className="hero-bottom"><span className="eyebrow">LEARNING. BUILDING. EXPLORING.</span><a href="#work" className="scroll-link">Scroll to explore <ArrowDown size={15} aria-hidden="true" /></a></div>
  </section>
}
