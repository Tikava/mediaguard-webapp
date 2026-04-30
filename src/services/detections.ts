import type { DetectionRequest, DetectionResponse, DetectionTask, DetectionTaskStatus } from '../types/api'
import { taskToDetectionResponse } from '../utils/mappers'
import { getMediaType } from '../utils/validators'
import { MOCK_RESULTS, nextDetectIndex, HISTORY_TASKS } from './mockData'

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

// Stores tasks created during this session for status/result lookups
const sessionTasks = new Map<string, DetectionTask>()

export async function detect(request: DetectionRequest): Promise<DetectionTask> {
  await delay(1200)
  const result = MOCK_RESULTS[nextDetectIndex()]
  const now = new Date().toISOString()
  const id = `mock-${Date.now()}`
  const mediaType = getMediaType(request.file) ?? 'image'
  const task: DetectionTask = {
    id,
    file: URL.createObjectURL(request.file),
    media_type: mediaType,
    status: 'done',
    created_at: now,
    updated_at: now,
    result: { ...result, created_at: now },
  }
  sessionTasks.set(id, task)
  return task
}

export async function fetchTaskStatus(id: string): Promise<DetectionTaskStatus> {
  await delay(300)
  const task = sessionTasks.get(id)
  return {
    id,
    media_type: task?.media_type ?? 'image',
    status: 'done',
    progress: '100%',
    is_finished: true,
    updated_at: task?.updated_at ?? new Date().toISOString(),
    result: task?.result ?? null,
  }
}

export async function fetchResult(id: string): Promise<DetectionResponse> {
  await delay(300)
  const task = sessionTasks.get(id) ?? HISTORY_TASKS.find(t => t.id === id)
  if (!task) throw new Error('Task not found')
  return taskToDetectionResponse(task)
}

export async function deleteTask(id: string): Promise<void> {
  await delay(300)
  sessionTasks.delete(id)
}
