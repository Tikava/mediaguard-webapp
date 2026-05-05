import type { DetectionRequest, DetectionResponse, DetectionTask, DetectionTaskStatus } from '../types/api'
import { taskToDetectionResponse } from '../utils/mappers'
import { httpClient } from './httpClient'

export async function detect(request: DetectionRequest): Promise<DetectionTask> {
  const form = new FormData()
  form.append('file', request.file)
  return httpClient.postForm<DetectionTask>('/api/detection/analyze/', form)
}

export async function fetchTaskStatus(id: string): Promise<DetectionTaskStatus> {
  return httpClient.get<DetectionTaskStatus>(`/api/detection/tasks/${id}/status/`)
}

export async function fetchResult(id: string): Promise<DetectionResponse> {
  const task = await httpClient.get<DetectionTask>(`/api/detection/tasks/${id}/`)
  return taskToDetectionResponse(task)
}

export async function deleteTask(id: string): Promise<void> {
  return httpClient.delete<void>(`/api/detection/tasks/${id}/`)
}
