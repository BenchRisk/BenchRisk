import { allMitigations, allScores, allModes } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import MitigationLayout from '@/layouts/MitigationLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Mitigations' })

export default function Page() {
  const sortedMitigations = allMitigations.sort((a, b) => {
    return a.mitigationNumber - b.mitigationNumber
  })

  //const mainContent = coreContent(author)

  return (
    <>
      <MitigationLayout mitigations={sortedMitigations}></MitigationLayout>
    </>
  )
}
