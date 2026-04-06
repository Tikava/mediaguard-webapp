import type { DetectionTask, DetectionResponse, HistoryItem } from '../types/api'

export function taskToDetectionResponse(task: DetectionTask): DetectionResponse {
  const result = task.result
  if (!result) {
    return {
      id: task.id,
      verdict: 'Inconclusive',
      confidence: 0,
      summary: '',
      createdAt: task.created_at,
    }
  }

  const verdict = result.is_fake ? 'Likely Manipulated' : 'Likely Authentic'
  // fake_probability is P(fake); for authentic results flip it so confidence = P(authentic)
  const confidence = result.is_fake ? result.fake_probability : 1 - result.fake_probability
  const summary = typeof result.details === 'string' ? result.details : ''

  const realProbability = result.details?.real_probability ?? (1 - result.fake_probability)
  const fakeProbability = result.details?.fake_probability ?? result.fake_probability

  return {
    id: task.id,
    verdict,
    confidence,
    summary,
    createdAt: task.created_at,
    realProbability,
    fakeProbability,
    modelVersion: result.model_version,
    mediaType: task.media_type,
    fileUrl: task.file,
  }
}

export function taskToHistoryItem(task: DetectionTask): HistoryItem {
  const result = task.result
  const verdict = result == null
    ? 'Inconclusive'
    : result.is_fake
    ? 'Likely Manipulated'
    : 'Likely Authentic'

  return {
    id: task.id,
    inputType: task.media_type,
    verdict,
    confidence: result?.fake_probability ?? 0,
    createdAt: task.created_at,
  }
}
