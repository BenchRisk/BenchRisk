import { allMitigations, allScores, allModes } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import ScoreLayout from '@/layouts/ScoreLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Scores' })

export default function Page() {
  const sortedScores = allScores.sort((a, b) => {
    return a.adoptedMitigations.length - b.adoptedMitigations.length;
  });

  //const mainContent = coreContent(author)

  return (
    <>
      <ScoreLayout scores={sortedScores}>
        todo
      </ScoreLayout>
    </>
  )
}
