import { allMitigations, allScores, allModes } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import ModeLayout from '@/layouts/ModeLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Failure Modes' })

export default function Page() {
  const sortedModes = allModes.sort((a, b) => {
    return a.number - b.number;
  });

  //const mainContent = coreContent(author)

  return (
    <>
      <ModeLayout modes={sortedModes}></ModeLayout>
    </>
  )
}
