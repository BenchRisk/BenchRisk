import { allModes } from 'contentlayer/generated'
import ModeLayout from '@/layouts/ModeLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Failure Modes' })

export default function Page() {
  const sortedModes = allModes.sort((a, b) => {
    return a.number - b.number
  })

  return (
    <>
      <ModeLayout modes={sortedModes}></ModeLayout>
    </>
  )
}
