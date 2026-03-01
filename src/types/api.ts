export type DetectionRequest = {
  mode: 'text' | 'image'
  text?: string
  file?: File
}

export type DetectionResponse = {
  id: string
  verdict: 'Likely Authentic' | 'Likely Manipulated' | 'Inconclusive'
  confidence: number // 0-1
  summary: string
  createdAt: string
  tags?: string[]
}

export type HistoryItem = {
  id: string
  inputType: 'text' | 'image'
  verdict: string
  confidence: number
  createdAt: string
}
