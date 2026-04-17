import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'

import { Authors, Blog, allAuthors, allBlogs } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import HeadlineLayout from '@/layouts/HeadlineLayout'
import { coreContent } from 'pliny/utils/contentlayer'

export default function Home() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)
  const welcomePost = allBlogs.find((p) => p.slug === 'welcome') as Blog

  return (
    <>
      <HeadlineLayout content={mainContent}>
        {welcomePost && (
          <MDXLayoutRenderer code={welcomePost.body.code} components={components} />
        )}
      </HeadlineLayout>
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
