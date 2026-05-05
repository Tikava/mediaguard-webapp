import { useCallback, useEffect, useRef, useState } from 'react'
import { detect, fetchTaskStatus } from '../services/detections'
import type { DetectionResponse, DetectionTask } from '../types/api'
import { isFileTooLarge, getMediaType } from '../utils/validators'
import { MAX_FILE_MB, ACCEPTED_TYPES } from '../constants/limits'
import { useTranslation } from 'react-i18next'
import { taskToDetectionResponse } from '../utils/mappers'

const POLL_INTERVAL_MS = 5000

export const useDetection = () => {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DetectionResponse | null>(null)
  const [pollingProgress, setPollingProgress] = useState<string | null>(null)
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopPolling = useCallback(() => {
    if (pollingRef.current !== null) {
      clearInterval(pollingRef.current)
      pollingRef.current = null
    }
  }, [])

  useEffect(() => () => stopPolling(), [stopPolling])

  const validate = useCallback(() => {
    if (!file) return t('input.errors.fileMissing')
    const mediaType = getMediaType(file)
    if (!mediaType) return t('input.errors.fileType')
    const maxMb = MAX_FILE_MB[mediaType]
    if (isFileTooLarge(file, maxMb)) return t('input.errors.fileSize', { size: maxMb })
    return null
  }, [file, t])

  const startPolling = useCallback((task: DetectionTask) => {
    pollingRef.current = setInterval(async () => {
      try {
        const status = await fetchTaskStatus(task.id)
        if (status.progress) setPollingProgress(`${status.progress}%`)

        if (status.status !== 'done' && status.status !== 'failed') return

        stopPolling()
        setPollingProgress(null)

        if (status.status === 'done') {
          const response = taskToDetectionResponse({
            ...task,
            status: status.status,
            result: status.result,
            updated_at: status.updated_at,
          })
          setResult(response)
        } else {
          setError(t('common.unknownError'))
        }
        setLoading(false)
      } catch (err) {
        stopPolling()
        setPollingProgress(null)
        setError(err instanceof Error ? err.message : t('common.unknownError'))
        setLoading(false)
      }
    }, POLL_INTERVAL_MS)
  }, [stopPolling, t])

  const submit = useCallback(async () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return null
    }
    setError(null)
    setLoading(true)
    setPollingProgress(null)
    try {
      const task = await detect({ file: file! })

      if (task.status === 'done') {
        const response = taskToDetectionResponse(task)
        setResult(response)
        setLoading(false)
        return response
      }

      if (task.status === 'failed') {
        setError(t('common.unknownError'))
        setLoading(false)
        return null
      }

      // Task is pending/processing — start polling
      setPollingProgress(t('buttons.analyzing'))
      startPolling(task)
      return null
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.unknownError'))
      setLoading(false)
      throw err
    }
  }, [file, validate, t, startPolling])

  const reset = useCallback(() => {
    stopPolling()
    setFile(null)
    setResult(null)
    setError(null)
    setPollingProgress(null)
  }, [stopPolling])

  return { file, setFile, loading, error, result, submit, reset, acceptedTypes: ACCEPTED_TYPES, pollingProgress }
}
