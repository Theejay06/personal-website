// Contact details from the supplied resume; portrait supplied by Theejay.
export const profile: { github: string | null; linkedin: string | null; email: string | null; portrait: string | null } = {
  github: 'https://github.com/Theejay06',
  linkedin: 'https://www.linkedin.com/in/theejay-tagama-810851366',
  email: 'th.tagama@gmail.com',
  portrait: `${import.meta.env.BASE_URL}images/theejay-tagama-cutout.png`,
}

export const navigation = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certificates' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
