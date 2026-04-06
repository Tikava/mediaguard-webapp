// ─── Backend API types ───────────────────────────────────────────────────────

export type MediaTypeEnum = 'image' | 'video' | 'audio'
export type StatusEnum = 'pending' | 'processing' | 'done' | 'failed'

export type DetectionResultDetails = {
  real_probability: number
  fake_probability: number
}

export type DetectionResult = {
  fake_probability: number
  is_fake: boolean
  details: DetectionResultDetails | null
  model_version?: string
  created_at: string
}

export type DetectionTask = {
  id: string
  file: string
  media_type: MediaTypeEnum
  status: StatusEnum
  created_at: string
  updated_at: string
  result: DetectionResult | null
}

export type PaginatedDetectionTaskList = {
  count: number
  next: string | null
  previous: string | null
  results: DetectionTask[]
}

export type TokenObtainPair = {
  access: string
  refresh: string
}

export type UserProfile = {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  avatar: string | null
  bio: string
  date_joined: string
}

export type Register = {
  username: string
  email?: string
}

// ─── UI types (mapped from backend) ─────────────────────────────────────────

export type DetectionRequest = {
  mode: 'image'
  file: File
}

export type DetectionResponse = {
  id: string
  verdict: 'Likely Authentic' | 'Likely Manipulated' | 'Inconclusive'
  confidence: number
  summary: string
  createdAt: string
  tags?: string[]
  // raw probabilities from backend
  realProbability?: number
  fakeProbability?: number
  modelVersion?: string
  mediaType?: MediaTypeEnum
  fileUrl?: string
}

export type HistoryItem = {
  id: string
  inputType: MediaTypeEnum
  verdict: string
  confidence: number
  createdAt: string
}
