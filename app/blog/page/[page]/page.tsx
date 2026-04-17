import { allBlogs } from 'contentlayer/generated'
import RedirectHome from '@/components/RedirectHome'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const totalPages = Math.max(1, Math.ceil(allBlogs.length / POSTS_PER_PAGE))
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export default function Page() {
  return <RedirectHome />
}
