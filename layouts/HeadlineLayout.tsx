import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'

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
          <div className="prose max-w-none pb-8 pt-0 dark:prose-invert xl:col-span-3">
            {status?.raw && <div>{status.raw}</div>}
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
