export interface Project {
  id: string
  title: string
  shortTitle: string
  description?: string
  role?: string
  technologies: string[]
  image?: string
  imageAlt?: string
  url?: string
  github?: string
  status?: string
  overview?: string[]
  details?: { heading: string; text: string }[]
}

export const projects: Project[] = [
  {
    id: '01', title: 'Canvas to Google Calendar', shortTitle: 'Academic task automation',
    description: 'A local n8n workflow that syncs quizzes and subject deadlines from UE Canvas to Google Calendar.',
    role: 'Developer', technologies: ['n8n', 'Google Calendar API', 'API Integration'], status: 'Runs locally',
    overview: ['UE Canvas', 'n8n workflow', 'Google Calendar'],
    details: [
      { heading: 'The problem', text: 'Keeping track of quizzes and deadlines across enrolled subjects required repeated manual checks in UE Canvas.' },
      { heading: 'What I built', text: 'An automation workflow using n8n and the Google Calendar API to sync academic tasks through scheduled API triggers.' },
      { heading: 'Result', text: 'Academic deadlines are brought into Google Calendar, reducing the need to check Canvas manually. The workflow runs locally.' },
      { heading: 'What I learned', text: 'Practical experience connecting APIs, scheduling automated workflows, and building productivity tools.' },
    ],
  },
  {
    id: '02', title: 'CodeBreak', shortTitle: 'CodeBreak',
    description: 'An educational dungeon game being designed to teach Python programming concepts through interactive gameplay.',
    role: 'Team Leader', technologies: ['Python', 'HTML', 'CSS'], status: 'In development / Design phase',
    details: [
      { heading: 'The idea', text: 'Use a dungeon-based game to make learning Python programming concepts interactive.' },
      { heading: 'My contribution', text: 'Leading a team of five, defining the technology stack, and applying agile planning and a Work Breakdown Structure to organize milestones and deliverables.' },
      { heading: 'Current status', text: 'Design and planning are underway. The intended gameplay is a project goal; a playable demo is not yet showcased here.' },
    ],
  },
  {
    id: '03',
    title: 'VerifAI',
    status: 'Live website',
    details: [
      { heading: 'The purpose', text: 'Help readers recognize AI-generated media and understand manipulated content through educational articles.' },
      { heading: 'My contribution', text: 'Website development, content architecture, and interface design for a multi-page AI media literacy resource.' },
      { heading: 'Explore the work', text: 'Browse the live site for educational topics on AI-generated media. This project focuses on AI education.' },
    ],
    shortTitle: 'VerifAI',
    description: 'A web-based educational project focused on helping users recognize signs of AI-generated media and understand manipulated content.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    role: 'Developer',
    url: 'https://verif-ai-website-brown.vercel.app/',
    image: `${import.meta.env.BASE_URL}images/verifai-preview.png`,
    imageAlt: 'VerifAI homepage with the heading Can You Tell What’s Real? and links to AI media literacy topics.',
  },
  {
    id: '04',
    title: 'Personal Page',
    status: 'Live website',
    details: [
      { heading: 'The purpose', text: 'A personal space for my biography, interests, blog stories, and photographs.' },
      { heading: 'My contribution', text: 'Built a personal website using HTML and CSS, organizing multiple pages around my life and interests.' },
      { heading: 'Explore the work', text: 'The live website and source repository are available below.' },
    ],
    shortTitle: 'Personal Page',
    description: 'A personal website sharing my biography, interests, and photo galleries.',
    role: 'Developer',
    technologies: ['HTML', 'CSS'],
    url: 'https://theejay06.github.io/PersonalPage/',
    github: 'https://github.com/Theejay06/PersonalPage',
    image: `${import.meta.env.BASE_URL}images/personal-page-preview.png`,
    imageAlt: 'Personal Page homepage with Theejay Tagama’s name over a travel photograph and navigation to biography, galleries, and interests.',
  },
]
