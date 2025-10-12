import { allMitigations, allScores, allModes } from 'contentlayer/generated'
import MitigationLayout from '@/layouts/MitigationLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Mitigations' })

export default function Page() {
  const sortedMitigations = allMitigations.sort((a, b) => {
    return a.mitigationNumber - b.mitigationNumber
  })

  return (
    <>
      <MitigationLayout mitigations={sortedMitigations}></MitigationLayout>
    </>
  )
}
