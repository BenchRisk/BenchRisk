import { allBlogs } from 'contentlayer/generated'
import RedirectHome from '@/components/RedirectHome'

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/') }))
}

export default function Page() {
  return <RedirectHome />
}
