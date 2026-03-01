export const formatDate = (value: string | number | Date) => {
  const date = new Date(value)
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatConfidence = (value: number) => `${Math.round(value * 100)}%`
