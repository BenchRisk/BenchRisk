'use client'

import { useState } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import Link from '@/components/Link'
import Drawer from '@/components/Drawer'
import siteMetadata from '@/data/siteMetadata'

function scoreBar(score, dimension, last=false) {
  return (
    <div>
      <div aria-hidden="true" className="mt-6">
        <div className="overflow-hidden rounded-full bg-red-800">
          <div style={{ width: Math.round(score*100) + '%' }} className="h-2 rounded-full bg-indigo-600" />
        </div>
        { last ? (
          <div className="mt-6 hidden grid-cols-1 text-sm font-medium text-gray-600 sm:grid">
            {/* <div className="text-indigo-600">Known Unreliable</div> */}
            <div className="text-center">
              <span className="text-indigo-600">{Math.round(score*100)}</span> percent of known
              <span className="text-indigo-600"> {dimension} </span>{ }risk mitigated
            </div>
            {/* <div className="text-right text-indigo-600">All Known Risks Mitigated</div> */}
          </div>
        ) : (
          <div className="mt-6 hidden grid-cols-1 text-sm font-medium text-gray-600 sm:grid">
            <div className="text-center">
              <span className="text-indigo-600">{Math.round(score*100)}</span> percent of known
              <span className="text-indigo-600"> {dimension} </span>{ }risk mitigated
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Provide a list of reliability statements for the benchmark
function scoreFindings(intelligibilityScore, consistencyScore, comprehensivenessScore, correctnessScore, longevityScore) {
  const highThreshold = 0.7;
  const lowThreshold = 0.5;

  let color = consistencyScore >= highThreshold ? "gray" : (consistencyScore >= lowThreshold ? "yellow" : "red");
  const intelligibilityStatement = <>
    <span className={`inline-flex items-center rounded-md bg-${color}-400/10 px-2 py-1 text-xs font-medium text-${color}-400 ring-1 ring-${color}-400/20 ring-inset`}>
      {intelligibilityScore >= highThreshold ? "lower" : (intelligibilityScore >= lowThreshold ? "moderate" : "high")} risk of misunderstanding
    </span> what the benchmark evidences.
  </>;

  color = consistencyScore >= highThreshold ? "gray" : (consistencyScore >= lowThreshold ? "yellow" : "red");
  const consistencyStatement = <>
    <span className={`inline-flex items-center rounded-md bg-${color}-400/10 px-2 py-1 text-xs font-medium text-${color}-400 ring-1 ring-${color}-400/20 ring-inset`}>
      {consistencyScore >= highThreshold ? "lower" : (consistencyScore >= lowThreshold ? "moderate" : "high")} risk of randomness misleading
    </span> via scores not representative of the system.
  </>;

  color = comprehensivenessScore >= highThreshold ? "gray" : (comprehensivenessScore >= lowThreshold ? "yellow" : "red");
  const comprehensivenessStatement = <>
    <span className={`inline-flex items-center rounded-md bg-${color}-400/10 px-2 py-1 text-xs font-medium text-${color}-400 ring-1 ring-${color}-400/20 ring-inset`}>
      {comprehensivenessScore >= highThreshold ? "lower" : (comprehensivenessScore >= lowThreshold ? "moderate" : "high")} risk of circumstance not being covered
    </span> when the benchmark may reasonably be expected to cover the circumstance.
  </>;

  color = correctnessScore >= highThreshold ? "gray" : (correctnessScore >= lowThreshold ? "yellow" : "red");
  const correctnessStatement = <>
    <span className={`inline-flex items-center rounded-md bg-${color}-400/10 px-2 py-1 text-xs font-medium text-${color}-400 ring-1 ring-${color}-400/20 ring-inset`}>
      {correctnessScore >= highThreshold ? "lower" : (correctnessScore >= lowThreshold ? "moderate" : "high")} risk of statistically biased
    </span> results misleading.
  </>;

  color = longevityScore >= highThreshold ? "gray" : (longevityScore >= lowThreshold ? "yellow" : "red");
  const longevityStatement = <>
    <span className={`inline-flex items-center rounded-md bg-${color}-400/10 px-2 py-1 text-xs font-medium text-${color}-400 ring-1 ring-${color}-400/20 ring-inset`}>
      {longevityScore >= highThreshold ? "lower" : (longevityScore >= lowThreshold ? "moderate" : "high")} risk of information degrading
    </span> through time.
  </>;

  return (
    <>
    People relying on this benchmark for real world decision making are at a...
    <ul>
      <li>{longevityStatement}</li>
      <li>{correctnessStatement}</li>
      <li>{intelligibilityStatement}</li>
      <li>{comprehensivenessStatement}</li>
      <li>{consistencyStatement}</li>
    </ul>
    </>
  )
}

export default function ScoreLayout({
  scores,
}) {
  const [searchValue, setSearchValue] = useState('');
  const filteredScores = scores.filter((score) => {
    const searchContent = score.name + ' ' + score.benchmarkDescription + ' ' + score.reference + ' ' + score.dateScored.toString()
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  })
  const displayScores = filteredScores;

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
            const rawData = <div className="prose max-w-none text-gray-500 dark:text-gray-400">
              <h2>Raw Data</h2>
              <ul>
                {Object.entries(score).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value.toString()}
                  </li>
                ))}
              </ul>
            </div>;

            const { name, minScore, dateScored, adoptedMitigations, intelligibilityScore, consistencyScore, comprehensivenessScore, correctnessScore, longevityScore } = score
            return (
              <li key={"Score" + name} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">Scored on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={dateScored}>{formatDate(dateScored, siteMetadata.locale)}</time>
                    </dd>
                    <dt className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">{adoptedMitigations.length} adopted mitigations</dt>
                    <dt className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">minimum score of {Math.round(minScore*100)}</dt>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/todo`} className="text-gray-900 dark:text-gray-100">
                          {name}
                        </Link>
                      </h3>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {scoreFindings(intelligibilityScore, consistencyScore, comprehensivenessScore, correctnessScore, longevityScore)}
                         Numerically, this is supported by the following scores:
                      </div>
                      {scoreBar(longevityScore, 'longevity')}
                      {scoreBar(correctnessScore, 'correctness')}
                      {scoreBar(intelligibilityScore, 'intelligibility')}
                      {scoreBar(comprehensivenessScore, 'comprehensiveness')}
                      {scoreBar(consistencyScore, 'consistency', true)}
                      <Drawer title={"Raw data"} contents={rawData}></Drawer>
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
