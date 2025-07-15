'use client'

import { useState, useEffect } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import Drawer from '@/components/Drawer'
import siteMetadata from '@/data/siteMetadata'
import HeatMap from '@/components/charts/HeatMap'
import Link from '@/components/Link'
import { ReactIconInline } from 'components/Icons'

function scoreBar(score, dimension, last = false) {
  return (
    <div>
      <div aria-hidden="true" className="mt-6">
        <div className="overflow-hidden rounded-full bg-red-800">
          <div
            style={{ width: Math.round(score * 100) + '%' }}
            className="h-2 rounded-full bg-indigo-600"
          />
        </div>
        {last ? (
          <div className="mt-6 grid-cols-1 text-sm font-medium text-gray-600 sm:grid">
            {/* <div className="text-indigo-600">Known Unreliable</div> */}
            <div className="text-center">
              <span className="text-indigo-600">{Math.round(score * 100)}</span> percent of known
              <span className="text-indigo-600"> {dimension} </span>
              {}risk mitigated
            </div>
            {/* <div className="text-right text-indigo-600">All Known Risks Mitigated</div> */}
          </div>
        ) : (
          <div className="mt-6 grid-cols-1 text-sm font-medium text-gray-600 sm:grid">
            <div className="text-center">
              <span className="text-indigo-600">{Math.round(score * 100)}</span> percent of known
              <span className="text-indigo-600"> {dimension} </span>
              {}risk mitigated
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Provide a list of reliability statements for the benchmark
function scoreFindings(
  intelligibilityScore,
  consistencyScore,
  comprehensivenessScore,
  correctnessScore,
  longevityScore,
  benchmarkDescription,
  reference
) {
  const highThreshold = 0.7
  const lowThreshold = 0.5

  const lowClasses = 'text-white-400 ring-red-800 bg-red-400/20 '
  const medClasses = 'text-yellow-400 ring-yellow-400 bg-yellow-400/20 '
  const highClasses = 'text-gray-400 ring-gray-400 '

  return (
    <>
      <span className="italic">{benchmarkDescription}</span>
      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
        Refer to the original reference for{' '}
        <Link
          href={reference.raw}
          className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
          more details about the benchmark
        </Link>
      </div>
      <br />
      The benchmark presents a...
      <ul>
        <li>
          <span
            className={
              `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset` +
              (longevityScore >= highThreshold
                ? highClasses
                : longevityScore >= lowThreshold
                  ? medClasses
                  : lowClasses)
            }
          >
            {longevityScore >= highThreshold
              ? 'lower'
              : longevityScore >= lowThreshold
                ? 'moderate'
                : 'high'}{' '}
            risk of information degrading
          </span>{' '}
          through time.
        </li>
        <li>
          <span
            className={
              `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset` +
              (correctnessScore >= highThreshold
                ? highClasses
                : correctnessScore >= lowThreshold
                  ? medClasses
                  : lowClasses)
            }
          >
            {correctnessScore >= highThreshold
              ? 'lower'
              : correctnessScore >= lowThreshold
                ? 'moderate'
                : 'high'}{' '}
            risk of statistically biased
          </span>{' '}
          results misleading.
        </li>
        <li>
          <span
            className={
              `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset` +
              (intelligibilityScore >= highThreshold
                ? highClasses
                : intelligibilityScore >= lowThreshold
                  ? medClasses
                  : lowClasses)
            }
          >
            {intelligibilityScore >= highThreshold
              ? 'lower'
              : intelligibilityScore >= lowThreshold
                ? 'moderate'
                : 'high'}{' '}
            risk of misunderstanding
          </span>{' '}
          what the benchmark evidences.
        </li>
        <li>
          <span
            className={
              `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset` +
              (comprehensivenessScore >= highThreshold
                ? highClasses
                : comprehensivenessScore >= lowThreshold
                  ? medClasses
                  : lowClasses)
            }
          >
            {comprehensivenessScore >= highThreshold
              ? 'lower'
              : comprehensivenessScore >= lowThreshold
                ? 'moderate'
                : 'high'}{' '}
            risk of circumstance not being covered
          </span>{' '}
          when the benchmark may reasonably be expected to cover the circumstance.
        </li>
        <li>
          <span
            className={
              `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset` +
              (consistencyScore >= highThreshold
                ? highClasses
                : consistencyScore >= lowThreshold
                  ? medClasses
                  : lowClasses)
            }
          >
            {consistencyScore >= highThreshold
              ? 'lower'
              : consistencyScore >= lowThreshold
                ? 'moderate'
                : 'high'}{' '}
            risk of randomness misleading
          </span>{' '}
          via scores not representative of the system.
        </li>
      </ul>
    </>
  )
}

export default function ScoreLayout({ scores, mitigationMap, failureModeMap }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredScores = scores.filter((score) => {
    const searchContent =
      score.name +
      ' ' +
      score.benchmarkDescription +
      ' ' +
      score.reference +
      ' ' +
      score.dateScored.toString()
    if (score.hide) return false // Skip hidden scores
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

  const chartScores = filteredScores.map((score) => {
    return {
      id: score.name,
      data: [
        { x: 'Longevity', y: score.longevityScore * 100 },
        { x: 'Correctness', y: score.correctnessScore * 100 },
        { x: 'Intelligibility', y: score.intelligibilityScore * 100 },
        { x: 'Comprehensiveness', y: score.comprehensivenessScore * 100 },
        { x: 'Consistency', y: score.consistencyScore * 100 },
        { x: 'Average', y: score.averageScore * 100 },
        { x: 'Minimum', y: score.minScore * 100 },
      ],
    }
  })

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          BenchRisk Scores
        </h1>
        <ul>
          {!filteredScores.length && 'No scores found.'}
          {!filteredScores.length ? (
            <></>
          ) : (
            <>
              <div style={{ display: 'grid', height: 400 }}>
                <div style={{ overflow: 'hidden' }}>
                  <HeatMap data={chartScores}></HeatMap>
                </div>
              </div>
              <div className="space-y-3 xl:col-span-3">
                <div>
                  <h3 className="text-2xl font-bold leading-8 tracking-tight">Score Details</h3>
                </div>
              </div>
            </>
          )}
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <div className="relative max-w-lg">
              <label>
                <span className="sr-only">Search scores</span>

                <div className="flex items-center space-x-2">
                  <input
                    aria-label="Filter Scores"
                    type="text"
                    value={decodeURIComponent(hashValue)}
                    onChange={handleChange}
                    placeholder="Filter scores based on name or description"
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
          {filteredScores.map((score) => {
            const {
              name,
              minScore,
              dateScored,
              adoptedMitigations,
              intelligibilityScore,
              consistencyScore,
              comprehensivenessScore,
              correctnessScore,
              longevityScore,
              benchmarkDescription,
              reference,
            } = score
            return (
              <li key={'Score' + name} className="py-4">
                <article className="grid grid-cols-4 items-baseline space-y-0 space-y-2">
                  <dl>
                    <dt className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Scored on
                    </dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={dateScored}>
                        {formatDate(dateScored, siteMetadata.locale)}
                      </time>
                    </dd>
                    <dt className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      {adoptedMitigations.length} adopted mitigations
                    </dt>
                    <dt className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      minimum score of {Math.round(minScore * 100)}
                    </dt>
                  </dl>
                  <div className="col-span-3 space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Drawer
                          title={`${name}`}
                          contents={''}
                          mitigations={adoptedMitigations}
                          failureModeMap={failureModeMap}
                          mitigationMap={mitigationMap}
                        ></Drawer>
                      </h3>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {scoreFindings(
                          intelligibilityScore,
                          consistencyScore,
                          comprehensivenessScore,
                          correctnessScore,
                          longevityScore,
                          benchmarkDescription,
                          reference
                        )}
                        Numerically, this is supported by the following scores:
                      </div>
                      {scoreBar(longevityScore, 'longevity')}
                      {scoreBar(correctnessScore, 'correctness')}
                      {scoreBar(intelligibilityScore, 'intelligibility')}
                      {scoreBar(comprehensivenessScore, 'comprehensiveness')}
                      {scoreBar(consistencyScore, 'consistency', true)}
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
