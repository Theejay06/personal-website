import { ArrowUpRight, FileImage } from 'lucide-react'
import type { Certificate } from '../data/certificates'

export default function CertificateCard({ certificate, onOpen }: { certificate?: Certificate; onOpen: () => void }) {
  return (
    <button className="certificate-card" onClick={onOpen} aria-label={certificate ? `Preview ${certificate.title}` : 'Preview certificate placeholder'}>
      <span className="certificate-caption">
        <span className="certificate-date eyebrow">{certificate?.date || 'COMING SOON'}</span>
        <span className="certificate-title">{certificate?.title || 'Room for what comes next.'}</span>
        <span className="certificate-type">{certificate ? `Certificate of ${certificate.type || 'recognition'}` : 'Certificates to be added'}</span>
        <span className="certificate-open">View full certificate <ArrowUpRight size={17} aria-hidden="true" /></span>
      </span>
      <span className="certificate-image">
        {certificate ? <img src={certificate.image} alt={certificate.imageAlt} loading="lazy" /> : (
          <span className="certificate-placeholder"><FileImage size={28} strokeWidth={1} aria-hidden="true" /><span>Certificate preview</span><span className="eyebrow">PLACEHOLDER / NO CREDENTIAL ADDED</span></span>
        )}
        <span className="certificate-image-label" aria-hidden="true">{certificate?.organization || 'CONTINUING TO LEARN'}<ArrowUpRight size={18} /></span>
      </span>
    </button>
  )
}
