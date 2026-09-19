import { useEffect, useRef } from 'react'
import { FileImage, X } from 'lucide-react'
import type { Certificate } from '../data/certificates'
import { ExternalLink } from './Shared'

export default function CertificateModal({ certificate, onClose }: { certificate?: Certificate; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const close = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const element = dialog.current
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    element?.showModal()
    document.body.style.overflow = 'hidden'
    close.current?.focus()
    return () => {
      element?.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])
  return <dialog ref={dialog} className="certificate-modal" aria-labelledby="certificate-modal-title" aria-describedby="certificate-modal-description" onKeyDown={event => {
    if (event.key !== 'Tab') return
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }} onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose() } }}>
    <div className="modal-inner"><button ref={close} className="modal-close" onClick={onClose} aria-label="Close certificate preview"><X size={22} /></button><p className="eyebrow">{certificate ? `CERTIFICATE${certificate.type ? ` OF ${certificate.type.toUpperCase()}` : ''}` : 'PLACEHOLDER PREVIEW'}</p>
      <div className="modal-image">{certificate ? <img src={certificate.image} alt={certificate.imageAlt} /> : <div className="certificate-placeholder"><FileImage size={44} strokeWidth={1} aria-hidden="true" /><span>Your certificate belongs here.</span><p>No certificate has been added yet.</p></div>}</div>
      <h2 id="certificate-modal-title">{certificate?.title || 'Certifications, coming soon.'}</h2><p id="certificate-modal-description">{certificate ? `${certificate.organization} · ${certificate.date}` : 'This is a preview placeholder, not an earned credential.'}</p>
      {certificate?.credentialId && <p className="credential-id">Credential ID: {certificate.credentialId}</p>}
      {certificate?.description && <p>{certificate.description}</p>}
      {certificate?.documentUrl && <ExternalLink href={certificate.documentUrl}>View original certificate</ExternalLink>}
      {certificate?.credentialUrl && <ExternalLink href={certificate.credentialUrl}>View credential</ExternalLink>}
    </div>
  </dialog>
}
