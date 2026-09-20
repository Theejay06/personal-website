import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, FileImage } from 'lucide-react'
import type { Certificate } from '../data/certificates'

export default function CertificateCard({ certificate, onOpen }: { certificate?: Certificate; onOpen: () => void }) {
  const reduced = useReducedMotion()
  return <motion.button className="certificate-card" onClick={onOpen} aria-label={certificate ? `Preview ${certificate.title}` : 'Preview certificate placeholder'} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} whileTap={reduced ? undefined : { scale: 0.985 }}>
    <span className="certificate-image">
      {certificate ? <img src={certificate.image} alt={certificate.imageAlt} loading="lazy" /> : <span className="certificate-placeholder"><FileImage size={28} strokeWidth={1.25} aria-hidden="true" /><span>Certificate preview</span></span>}
      <span className="certificate-open" aria-hidden="true"><ArrowUpRight size={17} /></span>
    </span>
    <span className="certificate-caption"><span className="certificate-date">{certificate?.date || 'Coming soon'}</span><span className="certificate-title">{certificate?.title || 'Room for what comes next.'}</span><span className="certificate-type">{certificate ? `${certificate.organization} · ${certificate.type || 'Recognition'}` : 'Certificates to be added'}</span></span>
  </motion.button>
}
