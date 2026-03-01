import type { DetectionRequest, DetectionResponse } from '../types/api'

const mockSummary =
  'The content shows no strong indicators of manipulation. Lighting and metadata patterns align with authentic captures.'

export async function detect(request: DetectionRequest): Promise<DetectionResponse> {
  // Simulated network call; replace with real endpoint.
  await new Promise((resolve) => setTimeout(resolve, 900))

  return {
    id: crypto.randomUUID(),
    verdict: request.mode === 'image' ? 'Likely Authentic' : 'Inconclusive',
    confidence: request.mode === 'image' ? 0.82 : 0.55,
    summary: mockSummary,
    createdAt: new Date().toISOString(),
    tags: ['hash-match', 'metadata-consistent'],
  }
}

export async function fetchResult(id: string): Promise<DetectionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return {
    id,
    verdict: 'Likely Authentic',
    confidence: 0.86,
    summary: mockSummary,
    createdAt: new Date().toISOString(),
    tags: ['camera-profile', 'hash-match'],
  }
}
