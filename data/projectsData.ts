interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'stub',
    description: `todo todo todo.`,
    imgSrc: '/static/images/stub.svg',
    href: 'https://benchrisk.ai',
  },
]

export default projectsData
