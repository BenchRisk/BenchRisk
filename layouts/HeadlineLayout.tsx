import { ReactNode } from 'react'
import Link from '@/components/Link'
import type { Authors } from 'contentlayer/generated'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function HeadlineLayout({ children, content }: Props) {
  const { status } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-3">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Welcome
            </h1>
            <div>{status?.raw}</div>
            <Link href={`/score`} className="text-gray-900 dark:text-gray-100">
              <Image src={'/static/images/scores.png'} alt="avatar" width={600} height={363} />
            </Link>

            <Link href={`/about`} className="text-gray-900 dark:text-gray-100">
              Learn more about this work
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
