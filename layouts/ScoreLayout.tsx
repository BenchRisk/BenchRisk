'use client'

import { useState } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Score } from 'contentlayer/generated'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function ScoreLayout({
  scores,
}) {
  const [searchValue, setSearchValue] = useState('')
  const filteredScores = scores.filter((score) => {
    const searchContent = score.name + ' ' + score.benchmarkDescription + ' ' + score.reference + ' ' + score.dateScored.toString()
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  const displayScores = filteredScores

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Scores
          </h1>
          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">Search articles</span>
              <input
                aria-label="Search Scores"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search scores"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
            </label>
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredScores.length && 'No scores found.'}
          {displayScores.map((score) => {

            const { benchmarkDescription, reference, name, dateScored, adoptedMitigations } = score
            return (
              <li key={"Score" + name} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={dateScored}>{formatDate(dateScored, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/todo`} className="text-gray-900 dark:text-gray-100">
                          {name}: {benchmarkDescription}
                        </Link>
                      </h3>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {adoptedMitigations.length}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
