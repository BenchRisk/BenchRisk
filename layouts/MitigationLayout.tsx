'use client'

import { useState, useEffect } from 'react'
import { allScores, allModes } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function MitigationLayout({ mitigations }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredMitigations = mitigations.filter((mitigation) => {
    const searchContent =
      'mitigation ' +
      mitigation.mitigationNumber.toString() +
      ' ' +
      mitigation.mitigatedNumber.toString() +
      ' ' +
      mitigation.dateAdded.toString() +
      ' ' +
      mitigation.dateUpdated.toString() +
      mitigation.questionStatement +
      ' ' +
      mitigation.severityReductionPercent.toString() +
      ' ' +
      mitigation.likelihoodReductionPercent.toString()
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const [hashValue, setHashValue] = useState('')

  // Set input from current URL hash on mount
  useEffect(() => {
    const updateFromHash = () => {
      const newHash = window.location.hash.slice(1)
      setHashValue(newHash)
      setSearchValue(decodeURIComponent(newHash))
    }

    if (typeof window !== 'undefined') {
      const initialHash = window.location.hash.slice(1) // remove '#'
      setHashValue(initialHash)
      setSearchValue(decodeURIComponent(initialHash))
      window.addEventListener('hashchange', updateFromHash)

      return () => {
        window.removeEventListener('hashchange', updateFromHash)
      }
    }
  }, [])

  // Update URL hash when input changes
  const handleChange = (e) => {
    const newHash = e.target.value
    setHashValue(newHash)
    setSearchValue(newHash)

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${newHash}`)
    }
  }

  // Update URL hash when a link is clicked
  const handleClick = (newHash) => {
    setHashValue(decodeURIComponent(newHash))
    setSearchValue(decodeURIComponent(newHash))

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${newHash}`)
    }
  }

  const failureModeMap = new Map(allModes.map((mode) => [mode.number, mode]))

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
                value={decodeURIComponent(hashValue)}
                onChange={handleChange}
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
          {filteredMitigations.map((mitigation) => {
            const {
              mitigationNumber,
              mitigatedNumber,
              dateAdded,
              dateUpdated,
              severityReductionPercent,
              likelihoodReductionPercent,
              questionStatement,
            } = mitigation
            return (
              <li key={'Mitigation' + mitigationNumber} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <ul className="flex flex-col space-y-1 xl:col-span-1">
                      <li className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                        <Link
                          href={'/mitigation#mitigation%20' + mitigationNumber + '%20'}
                          className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          onClick={() => handleClick('mitigation%20' + mitigationNumber + '%20')}
                        >
                          Mitigation {mitigationNumber}
                        </Link>
                      </li>
                      <li className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                        for{' '}
                        <Link
                          href={'/mode#failure%20mode%20' + mitigatedNumber + '%20'}
                          className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          Failure Mode {mitigatedNumber}
                        </Link>
                      </li>
                      <li className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                        risking{' '}
                        <Link
                          href={
                            '/mode#' +
                            encodeURIComponent(failureModeMap.get(mitigatedNumber)?.stage || '') +
                            '%20'
                          }
                          className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {failureModeMap.get(mitigatedNumber)?.stage}
                        </Link>
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
                    <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      {questionStatement}
                    </div>
                    <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      This mitigates the {failureModeMap.get(mitigatedNumber)?.dimension} Failure
                      Mode:{' '}
                      <span className="italic">{failureModeMap.get(mitigatedNumber)?.short}</span>
                    </div>
                    <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Affirming Benchmarks:{' '}
                    </div>

                    {allScores.map((score) => {
                      if (score.adoptedMitigations?.includes(mitigationNumber)) return ''
                      return (
                        <Link
                          key={mitigationNumber.toString() + score.name}
                          href={'/score#' + encodeURIComponent(score.name)}
                          className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                        >
                          {score.name}
                        </Link>
                      )
                    })}
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
