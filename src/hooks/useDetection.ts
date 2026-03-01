import { useCallback, useState } from 'react'
import { detect } from '../services/detections'
import type { DetectionRequest, DetectionResponse } from '../types/api'
import { isFileTooLarge, isSupportedFileType, isValidUrl } from '../utils/validators'
import { MAX_IMAGE_MB } from '../constants/limits'
import { useTranslation } from 'react-i18next'

export const useDetection = () => {
  const { t } = useTranslation()
  const [mode, setMode] = useState<'text' | 'image'>('text')
  const [textValue, setTextValue] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DetectionResponse | null>(null)

  const validate = useCallback(() => {
    if (mode === 'text' && textValue.trim().length < 4) {
      return t('input.errors.textLength')
    }
    if (mode === 'text' && !isValidUrl(textValue) && textValue.trim().length < 20) {
      return t('input.errors.textValidity')
    }
    if (mode === 'image') {
      if (!file) return t('input.errors.fileMissing')
      if (isFileTooLarge(file, MAX_IMAGE_MB)) return t('input.errors.fileSize', { size: MAX_IMAGE_MB })
      if (!isSupportedFileType(file, 'image/png, image/jpeg')) return t('input.errors.fileType')
    }
    return null
  }, [file, mode, textValue, t])

  const submit = useCallback(async () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return null
    }
    setError(null)
    setLoading(true)
    try {
      const payload: DetectionRequest = mode === 'text' ? { mode, text: textValue } : { mode, file: file! }
      const response = await detect(payload)
      setResult(response)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.retry'))
      return null
    } finally {
      setLoading(false)
    }
  }, [file, mode, textValue, validate, t])

  return {
    mode,
    setMode,
    textValue,
    setTextValue,
    file,
    setFile,
    loading,
    error,
    result,
    submit,
  }
}
