import { allMitigations, allScores, allModes } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import ScoreLayout from '@/layouts/ScoreLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Scores' })

export default function Page() {
  // Make all mitigations indexable by their mitigation number
  const mitigationMap = new Map(
    allMitigations.map((mitigation) => [mitigation.mitigationNumber, mitigation])
  )

  const failureModeMap = new Map(allModes.map((mode) => [mode.number, mode]))

  // Find the total risk that may be mitigated
  const totalRisk = allModes.reduce((acc, mode) => {
    return acc + mode.severity
  }, 0)

  // Find all the failure modes according to their dimensions
  const intelligibilityModes = allModes.filter((mode) => mode.dimension === 'Intelligibility')
  const longevityModes = allModes.filter((mode) => mode.dimension === 'Longevity')
  const consistencyModes = allModes.filter((mode) => mode.dimension === 'Consistency')
  const correctnessModes = allModes.filter((mode) => mode.dimension === 'Correctness')
  const comprehensivenesModes = allModes.filter((mode) => mode.dimension === 'Comprehensiveness')

  // Find the total risk for each dimension
  const totalIntelligibilityRisk = intelligibilityModes.reduce((acc, mode) => {
    return acc + mode.severity
  }, 0)
  const totalConsistencyRisk = consistencyModes.reduce((acc, mode) => {
    return acc + mode.severity
  }, 0)
  const totalLongevityRisk = longevityModes.reduce((acc, mode) => {
    return acc + mode.severity
  }, 0)
  const totalCorrectnessRisk = correctnessModes.reduce((acc, mode) => {
    return acc + mode.severity
  }, 0)
  const totalComprehensivenessRisk = comprehensivenesModes.reduce((acc, mode) => {
    return acc + mode.severity
  }, 0)

  // Find the scores for each of the benchmarks and pack it into a larger data structure
  const scored = allScores.map((score) => {
    // Pack all the risks to be indexed by their number, but with the risks serving as a running total
    const riskMap = new Map(
      allModes.map((mode) => [
        mode.number,
        {
          initialSeverity: mode.severity,
          mitigatedSeverity: mode.severity,
          mitigatedLikelihood: 1.0,
          dimension: mode.dimension,
        },
      ])
    )

    // Reduce the severity or likelihood by their mitigations
    ;(score.adoptedMitigations ?? []).forEach((mitigationNumber) => {
      const mitigation = mitigationMap.get(mitigationNumber)
      if (!mitigation) return
      const riskScore = riskMap.get(mitigation.mitigatedNumber)
      if (!riskScore) return
      riskScore.mitigatedSeverity -=
        (mitigation.severityReductionPercent * riskScore.mitigatedSeverity) / 100.0
      riskScore.mitigatedLikelihood -=
        (mitigation.likelihoodReductionPercent * riskScore.mitigatedLikelihood) / 100.0
    })

    let accInteligibility = 0
    let accLongevity = 0
    let accCorrectness = 0
    let accConsistency = 0
    let accComprehensiveness = 0
    riskMap.forEach((value, key) => {
      const { initialSeverity, mitigatedSeverity, mitigatedLikelihood, dimension } = value
      if (dimension === 'Intelligibility') {
        accInteligibility += initialSeverity * 1.0 - mitigatedSeverity * mitigatedLikelihood
      } else if (dimension === 'Longevity') {
        accLongevity += initialSeverity * 1.0 - mitigatedSeverity * mitigatedLikelihood
      } else if (dimension === 'Correctness') {
        accCorrectness += initialSeverity * 1.0 - mitigatedSeverity * mitigatedLikelihood
      } else if (dimension === 'Consistency') {
        accConsistency += initialSeverity * 1.0 - mitigatedSeverity * mitigatedLikelihood
      } else if (dimension === 'Comprehensiveness') {
        accComprehensiveness += initialSeverity * 1.0 - mitigatedSeverity * mitigatedLikelihood
      }
    })
    const totalLongevityRiskMitigated = accLongevity
    const totalConsistencyRiskMitigated = accConsistency
    const totalCorrectnessRiskMitigated = accCorrectness
    const totalIntelligibilityRiskMitigated = accInteligibility
    const totalComprehensivenessRiskMitigated = accComprehensiveness
    const totalRiskMitigated =
      totalIntelligibilityRiskMitigated +
      totalLongevityRiskMitigated +
      totalConsistencyRiskMitigated +
      totalCorrectnessRiskMitigated
    const longevityScore = totalLongevityRiskMitigated / totalLongevityRisk
    const intelligibilityScore = totalIntelligibilityRiskMitigated / totalIntelligibilityRisk
    const correctnessScore = totalCorrectnessRiskMitigated / totalCorrectnessRisk
    const consistencyScore = totalConsistencyRiskMitigated / totalConsistencyRisk
    const comprehensivenessScore = totalComprehensivenessRiskMitigated / totalComprehensivenessRisk
    return {
      ...score,
      totalRisk: totalRisk,
      totalIntelligibilityRiskMitigated: totalIntelligibilityRiskMitigated,
      totalLongevityRiskMitigated: totalLongevityRiskMitigated,
      totalConsistencyRiskMitigated: totalConsistencyRiskMitigated,
      totalCorrectnessRiskMitigated: totalCorrectnessRiskMitigated,
      totalComprehensivenessRiskMitigated: totalComprehensivenessRiskMitigated,
      longevityScore: longevityScore,
      intelligibilityScore: intelligibilityScore,
      correctnessScore: correctnessScore,
      consistencyScore: consistencyScore,
      comprehensivenessScore: comprehensivenessScore,
      totalScore: totalRiskMitigated / totalRisk,
      averageScore:
        (longevityScore +
          intelligibilityScore +
          correctnessScore +
          consistencyScore +
          comprehensivenessScore) /
        5.0,
      minScore: Math.min(
        longevityScore,
        intelligibilityScore,
        correctnessScore,
        consistencyScore,
        comprehensivenessScore
      ),
      totalIntelligibilityRisk: totalIntelligibilityRisk,
      totalLongevityRisk: totalLongevityRisk,
      totalConsistencyRisk: totalConsistencyRisk,
      totalCorrectnessRisk: totalCorrectnessRisk,
      totalComprehensivenessRisk: totalComprehensivenessRisk,
      totalRiskMitigated: totalRiskMitigated,
    }
  })

  const sortedScores = scored.sort((a, b) => {
    return b.totalScore - a.totalScore
  })

  //const mainContent = coreContent(author)

  return (
    <>
      <ScoreLayout
        scores={sortedScores}
        mitigationMap={mitigationMap}
        failureModeMap={failureModeMap}
      ></ScoreLayout>
    </>
  )
}
