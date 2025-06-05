'use client'

import { useState } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function MitigationLayout({
  mitigations,
}) {
  const [searchValue, setSearchValue] = useState('')
  const filteredMitigations = mitigations.filter((mitigation) => {
    const searchContent = mitigation.mitigationNumber.toString() + ' ' + mitigation.mitigatedNumber.toString() + ' ' + mitigation.dateAdded.toString() + ' ' + mitigation.dateUpdated.toString() + mitigation.questionStatement + ' ' + mitigation.severityReductionPercent.toString() + ' ' + mitigation.likelihoodReductionPercent.toString()
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  const displayMitigations = filteredMitigations

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Mitigations
          </h1>
          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">Search articles</span>
              <input
                aria-label="Search Mitigations"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search mitigations"
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
          {!filteredMitigations.length && 'No mitigations found.'}
          {displayMitigations.map((mitigation) => {

            const { mitigationNumber, mitigatedNumber, dateAdded, dateUpdated, severityReductionPercent, likelihoodReductionPercent, questionStatement } = mitigation
            return (
              <li key={"Mitigation" + mitigationNumber} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <ul className="flex flex-col space-y-1 xl:col-span-1">
                    <li className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                      Mitigation {mitigationNumber}
                    </li>
                    <li className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                      for <Link href={'/mode#failure%20mode%20' + mitigatedNumber + '%20'}>Failure Mode {mitigatedNumber}</Link>
                    </li>
                    <li className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Severity Reduction {severityReductionPercent.toString()}
                    </li>
                    <li className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Likelihood Reduction {likelihoodReductionPercent.toString()}
                    </li>
                    {/* <li className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Added <time dateTime={dateAdded}>{formatDate(dateAdded, siteMetadata.locale)}</time>
                    </li>
                    <li className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Updated <time dateTime={dateUpdated}>{formatDate(dateUpdated, siteMetadata.locale)}</time>
                    </li> */}
                  </ul>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-xl font-bold leading-8 tracking-tight">
                        <Link href={`#todo`} className="text-gray-900 dark:text-gray-100">
                          {questionStatement}
                        </Link>
                      </h3>
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
