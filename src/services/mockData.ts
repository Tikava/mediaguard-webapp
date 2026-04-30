import type { DetectionResult, DetectionTask, PaginatedDetectionTaskList, UserProfile } from '../types/api'

// Cycling index for detect() calls — increments on each submission
let _detectIndex = 0

export function nextDetectIndex(): number {
  const i = _detectIndex
  _detectIndex = (_detectIndex + 1) % MOCK_RESULTS.length
  return i
}

// Results that cycle in order on each new detection submission
export const MOCK_RESULTS: DetectionResult[] = [
  {
    fake_probability: 0.05,
    is_fake: false,
    details: { real_probability: 0.95, fake_probability: 0.05 },
    model_version: '1.2.0',
    created_at: new Date().toISOString(),
  },
  {
    fake_probability: 0.87,
    is_fake: true,
    details: { real_probability: 0.13, fake_probability: 0.87 },
    model_version: '1.2.0',
    created_at: new Date().toISOString(),
  },
  {
    fake_probability: 0.18,
    is_fake: false,
    details: { real_probability: 0.82, fake_probability: 0.18 },
    model_version: '1.2.0',
    created_at: new Date().toISOString(),
  },
  {
    fake_probability: 0.93,
    is_fake: true,
    details: { real_probability: 0.07, fake_probability: 0.93 },
    model_version: '1.2.0',
    created_at: new Date().toISOString(),
  },
  {
    fake_probability: 0.24,
    is_fake: false,
    details: { real_probability: 0.76, fake_probability: 0.24 },
    model_version: '1.2.0',
    created_at: new Date().toISOString(),
  },
]

export const MOCK_USER: UserProfile = {
  id: 1,
  username: 'demo_user',
  email: 'demo@mediaguard.ai',
  first_name: 'Demo',
  last_name: 'User',
  avatar: null,
  bio: 'MediaGuard demo account',
  date_joined: '2026-01-01T00:00:00Z',
}

export const HISTORY_TASKS: DetectionTask[] = [
  {
    id: 'hist-1',
    file: '',
    media_type: 'image',
    status: 'done',
    created_at: '2026-04-29T14:00:00Z',
    updated_at: '2026-04-29T14:00:04Z',
    result: { fake_probability: 0.05, is_fake: false, details: { real_probability: 0.95, fake_probability: 0.05 }, model_version: '1.2.0', created_at: '2026-04-29T14:00:04Z' },
  },
  {
    id: 'hist-2',
    file: '',
    media_type: 'video',
    status: 'done',
    created_at: '2026-04-29T12:00:00Z',
    updated_at: '2026-04-29T12:00:09Z',
    result: { fake_probability: 0.87, is_fake: true, details: { real_probability: 0.13, fake_probability: 0.87 }, model_version: '1.2.0', created_at: '2026-04-29T12:00:09Z' },
  },
  {
    id: 'hist-3',
    file: '',
    media_type: 'audio',
    status: 'done',
    created_at: '2026-04-28T18:00:00Z',
    updated_at: '2026-04-28T18:00:06Z',
    result: { fake_probability: 0.22, is_fake: false, details: { real_probability: 0.78, fake_probability: 0.22 }, model_version: '1.2.0', created_at: '2026-04-28T18:00:06Z' },
  },
  {
    id: 'hist-4',
    file: '',
    media_type: 'image',
    status: 'done',
    created_at: '2026-04-28T10:00:00Z',
    updated_at: '2026-04-28T10:00:05Z',
    result: { fake_probability: 0.91, is_fake: true, details: { real_probability: 0.09, fake_probability: 0.91 }, model_version: '1.2.0', created_at: '2026-04-28T10:00:05Z' },
  },
  {
    id: 'hist-5',
    file: '',
    media_type: 'video',
    status: 'done',
    created_at: '2026-04-27T16:00:00Z',
    updated_at: '2026-04-27T16:00:11Z',
    result: { fake_probability: 0.14, is_fake: false, details: { real_probability: 0.86, fake_probability: 0.14 }, model_version: '1.2.0', created_at: '2026-04-27T16:00:11Z' },
  },
  {
    id: 'hist-6',
    file: '',
    media_type: 'audio',
    status: 'done',
    created_at: '2026-04-27T09:00:00Z',
    updated_at: '2026-04-27T09:00:07Z',
    result: { fake_probability: 0.76, is_fake: true, details: { real_probability: 0.24, fake_probability: 0.76 }, model_version: '1.2.0', created_at: '2026-04-27T09:00:07Z' },
  },
  {
    id: 'hist-7',
    file: '',
    media_type: 'image',
    status: 'done',
    created_at: '2026-04-26T20:00:00Z',
    updated_at: '2026-04-26T20:00:04Z',
    result: { fake_probability: 0.08, is_fake: false, details: { real_probability: 0.92, fake_probability: 0.08 }, model_version: '1.2.0', created_at: '2026-04-26T20:00:04Z' },
  },
  {
    id: 'hist-8',
    file: '',
    media_type: 'video',
    status: 'done',
    created_at: '2026-04-26T14:00:00Z',
    updated_at: '2026-04-26T14:00:10Z',
    result: { fake_probability: 0.63, is_fake: true, details: { real_probability: 0.37, fake_probability: 0.63 }, model_version: '1.2.0', created_at: '2026-04-26T14:00:10Z' },
  },
  {
    id: 'hist-9',
    file: '',
    media_type: 'audio',
    status: 'done',
    created_at: '2026-04-25T11:00:00Z',
    updated_at: '2026-04-25T11:00:06Z',
    result: { fake_probability: 0.31, is_fake: false, details: { real_probability: 0.69, fake_probability: 0.31 }, model_version: '1.2.0', created_at: '2026-04-25T11:00:06Z' },
  },
  {
    id: 'hist-10',
    file: '',
    media_type: 'image',
    status: 'done',
    created_at: '2026-04-25T08:00:00Z',
    updated_at: '2026-04-25T08:00:05Z',
    result: { fake_probability: 0.88, is_fake: true, details: { real_probability: 0.12, fake_probability: 0.88 }, model_version: '1.2.0', created_at: '2026-04-25T08:00:05Z' },
  },
]

export function getMockHistory(page: number, pageSize: number): PaginatedDetectionTaskList {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return {
    count: HISTORY_TASKS.length,
    next: end < HISTORY_TASKS.length ? `?page=${page + 1}` : null,
    previous: page > 1 ? `?page=${page - 1}` : null,
    results: HISTORY_TASKS.slice(start, end),
  }
}
