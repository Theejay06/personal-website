export interface Certificate {
  id: string
  title: string
  organization: string
  date: string
  image: string
  imageAlt: string
  type?: 'Participation' | 'Appreciation' | 'Membership'
  description?: string
  documentUrl?: string
  credentialId?: string
  credentialUrl?: string
}

// Details transcribed from the supplied certificates and accompanying emails.
// documentUrl opens the original document, not an external verification service.
export const certificates: Certificate[] = [
  {
    id: 'thesis-far-from-home',
    title: 'Thesis: Far From Home',
    organization: 'UE Manila · CCSS Research and Development Unit',
    date: 'August 29, 2026',
    type: 'Participation',
    description: 'Participated in “Navigating Program-Specific Frontiers,” the second seminar in the College Thesis Seminar Series, focused on preparation for the college thesis.',
    image: '/certificates/thesis-seminar-a.png',
    imageAlt: 'Certificate of Participation awarded to Theejay F. Tagama for Thesis: Far From Home on August 29, 2026.',
    documentUrl: '/certificates/thesis-seminar-a.pdf',
  },
  {
    id: 'thesis-homecoming',
    title: 'Thesis: Homecoming',
    organization: 'UE Manila · CCSS Research and Development Unit',
    date: 'August 14, 2026',
    type: 'Participation',
    description: 'Participated in “With Great Research Comes Great Responsibility,” the first seminar in the College Thesis Seminar Series, supporting research understanding and thesis preparation.',
    image: '/certificates/thesis-seminar-b.png',
    imageAlt: 'Certificate of Participation awarded to Theejay F. Tagama for Thesis: Homecoming on August 14, 2026.',
    documentUrl: '/certificates/thesis-seminar-b.pdf',
  },
  {
    id: 'philsec-2026',
    title: 'PhilSec 2026',
    organization: 'Tradepass · PhilSec',
    date: 'June 30 – July 1, 2026',
    type: 'Appreciation',
    description: 'Recognized for volunteering at PhilSec 2026 at the Manila Marriott Hotel, Philippines, and contributing time and support to the event.',
    image: '/certificates/philsec-2026.png',
    imageAlt: 'Certificate presented to Theejay Tagama for volunteering at PhilSec on June 30 and July 1, 2026.',
    documentUrl: '/certificates/philsec-2026.pdf',
  },
  {
    id: 'blockchain-2026',
    title: 'Getting Started with Blockchain',
    organization: 'JPCS UE Manila Chapter × Bitskwela',
    date: 'April 6, 2026',
    type: 'Participation',
    description: 'Attended “Getting Started with Blockchain: Guided Learning for Career Impact” at the UE Manila Conference Hall, exploring blockchain technology and its emerging applications.',
    image: '/certificates/blockchain-2026.png',
    imageAlt: 'Certificate of Participation awarded to Theejay F. Tagama for Getting Started with Blockchain on April 6, 2026.',
    documentUrl: '/certificates/blockchain-2026.png',
  },
  {
    id: 'jpcs-national-membership',
    title: 'JPCS National Membership',
    organization: 'Junior Philippine Computer Society · Philippine Computer Society',
    date: 'Academic Year 2025–2026',
    type: 'Membership',
    description: 'Recognized as a JPCS National member through the University of the East – Manila chapter for academic year 2025–2026.',
    image: '/certificates/jpcs-membership.png',
    imageAlt: 'JPCS National Certificate of Membership for Theejay F. Tagama for academic year 2025–2026.',
    credentialId: 'NCR13204-AY2025-2026-0040',
    documentUrl: '/certificates/jpcs-membership.pdf',
  },
]
