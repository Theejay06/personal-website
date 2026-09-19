import { useState } from 'react'
import { certificates } from '../data/certificates'
import type { Certificate } from '../data/certificates'
import CertificateCard from './CertificateCard'
import CertificateModal from './CertificateModal'
import { Reveal, SectionLabel } from './Shared'

export default function Certifications() {
  const [selection, setSelection] = useState<{ certificate?: Certificate } | null>(null)
  return <section id="certifications" className="section container" aria-labelledby="certifications-title"><Reveal><SectionLabel number="04">CERTIFICATES & MEMBERSHIPS</SectionLabel><div className="section-heading"><h2 id="certifications-title">Certificates & Memberships<span className="accent">.</span></h2><span className="eyebrow">CONTINUING TO LEARN</span></div><div className={`certificate-gallery ${certificates.length === 0 ? 'is-pending' : ''}`}>{certificates.length ? certificates.map(certificate => <CertificateCard key={certificate.id} certificate={certificate} onOpen={() => setSelection({ certificate })} />) : <CertificateCard onOpen={() => setSelection({})} />}</div></Reveal>{selection && <CertificateModal certificate={selection.certificate} onClose={() => setSelection(null)} />}</section>
}
