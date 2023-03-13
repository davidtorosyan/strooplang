import type { TestResult, TestStats } from "@/data/types";

const minResponseCount = 1
const minDurationMs = 200
const maxDurationMs = 5000

function mean(arr: number[]) {
  return Math.round(arr.reduce((a, b) => a + b) / arr.length);
}

function toPercent(value: number) {
  return Math.round(value * 100) / 100
}

export function computeStats(result: TestResult) : TestStats | undefined {
  const correct = result.responses.filter(r => r.correct)
  const valid = correct.filter(r => r.durationMs > minDurationMs && r.durationMs < maxDurationMs)

  const congruent = valid.filter(r => r.stimulus.congruent)
  const incongruent = valid.filter(r => !r.stimulus.congruent)

  if (congruent.length < minResponseCount || incongruent.length < minResponseCount) {
    return undefined
  }
  
  const congruentMeanDurationMs = mean(congruent.map(r => r.durationMs))
  const incongruentMeanDurationMs = mean(incongruent.map(r => r.durationMs))

  const deltaMs = incongruentMeanDurationMs - congruentMeanDurationMs
  const deltaPercent = toPercent(deltaMs / congruentMeanDurationMs)

  return {
    responseCount: result.responses.length,
    validCount: valid.length,
    congruentMeanDurationMs,
    incongruentMeanDurationMs,
    deltaMs,
    deltaPercent,
  }
}