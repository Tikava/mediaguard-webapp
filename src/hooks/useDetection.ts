import { useCallback, useState } from 'react'
import { detect } from '../services/detections'
import type { DetectionResponse } from '../types/api'
import { isFileTooLarge, getMediaType } from '../utils/validators'
import { MAX_FILE_MB, ACCEPTED_TYPES } from '../constants/limits'
import { useTranslation } from 'react-i18next'

export const useDetection = () => {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DetectionResponse | null>(null)

  const validate = useCallback(() => {
    if (!file) return t('input.errors.fileMissing')
    const mediaType = getMediaType(file)
    if (!mediaType) return t('input.errors.fileType')
    const maxMb = MAX_FILE_MB[mediaType]
    if (isFileTooLarge(file, maxMb)) return t('input.errors.fileSize', { size: maxMb })
    return null
  }, [file, t])

  const submit = useCallback(async () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return null
    }
    setError(null)
    setLoading(true)
    try {
      const response = await detect({ file: file! })
      setResult(response)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.retry'))
      throw err
    } finally {
      setLoading(false)
    }
  }, [file, validate, t])

  const reset = useCallback(() => {
    setFile(null)
    setResult(null)
    setError(null)
  }, [])

  return { file, setFile, loading, error, result, submit, reset, acceptedTypes: ACCEPTED_TYPES }
}
