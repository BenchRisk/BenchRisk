'use client'

import { useState, useEffect } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function ModeLayout({ modes }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredModes = modes.filter((mode) => {
    const searchContent =
      'failure mode ' +
      mode.number.toString() +
      ' ' +
      mode.short +
      ' ' +
      mode.example +
      ' ' +
      mode.severity.toString() +
      ' benchmark stage ' +
      mode.stage +
      ' ' +
      mode.about +
      ' ' +
      ' ' +
      mode.dateAdded.toString() +
      ' ' +
      mode.dateUpdated.toString()
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

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Failure Modes
          </h1>
          <p>These failure modes are all scoped around benchmarks intended to score information-only chatbots. Agentic systems (i.e., those taking direct action) are not in scope for this release versioned as BenchRisk-ChatBot-v1.0.</p>
          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">Search failure modes</span>

              <div className="flex items-center space-x-2">
                <input
                  aria-label="Filter Failure Modes"
                  type="text"
                  value={decodeURIComponent(hashValue)}
                  onChange={handleChange}
                  placeholder="Filter by description text"
                  className="block w-96 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                />
                <button
                  type="button"
                  className="shadow-xs rounded-sm bg-white/10 px-2 py-1 text-sm font-semibold text-white hover:bg-white/20"
                  onClick={() => handleClick('')}
                >
                  X Clear Filter
                </button>
              </div>
            </label>
          </div>
        </div>
        <ul>
          {!filteredModes.length && 'No failure modes found.'}
          {filteredModes.map((mode) => {
            const { number, short, example, severity, stage, about, dateAdded, dateUpdated } = mode
            return (
              <li key={'FailureMode' + number} className="py-4">
                <article className="grid grid-cols-4 items-baseline space-y-0 space-y-2">
                  <ul className="col-span-1 flex flex-col space-y-1">
                    <li className="text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                      <Link
                        href={'/mode#failure%20mode%20' + number + '%20'}
                        className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        onClick={() => handleClick('failure%20mode%20' + number + '%20')}
                      >
                        {mode.dimension} Failure Mode {number}
                      </Link>
                    </li>
                    <li className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Severity {mode.severity.toString()}
                    </li>
                    <li className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <Link
                        href={'/mode#Benchmark%20stage%20' + mode.stage + '%20'}
                        className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        onClick={() => handleClick('Benchmark%20stage%20' + mode.stage + '%20')}
                      >
                        Benchmark Stage {mode.stage}
                      </Link>
                    </li>
                    <li className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Added{' '}
                      <time dateTime={dateAdded}>{formatDate(dateAdded, siteMetadata.locale)}</time>
                    </li>
                    <li className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Updated{' '}
                      <time dateTime={dateUpdated}>
                        {formatDate(dateUpdated, siteMetadata.locale)}
                      </time>
                    </li>
                  </ul>
                  <div className="col-span-3 space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        {/* <Link href={`#todo`} className="text-gray-900 dark:text-gray-100"> */}
                        {short}
                        {/* </Link> */}
                      </h3>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      Example realization: <span className="italic">{example}</span>
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
