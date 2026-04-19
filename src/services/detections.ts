import { httpClient } from './httpClient'
import type { DetectionRequest, DetectionResponse, DetectionTask } from '../types/api'
import { taskToDetectionResponse } from '../utils/mappers'

export async function detect(request: DetectionRequest): Promise<DetectionResponse> {
  const form = new FormData()
  form.append('file', request.file)
  const task = await httpClient.postForm<DetectionTask>('/api/detection/analyze/', form)
  return taskToDetectionResponse(task)
}


export async function fetchResult(id: string): Promise<DetectionResponse> {
  const task = await httpClient.get<DetectionTask>(`/api/detection/tasks/${id}/`)
  return taskToDetectionResponse(task)
}

export async function deleteTask(id: string): Promise<void> {
  return httpClient.delete<void>(`/api/detection/tasks/${id}/`)
}
