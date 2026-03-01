const urlPattern = /^(https?:\/\/)[\w.-]+(\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/i

export const isValidUrl = (value: string) => urlPattern.test(value)

export const isFileTooLarge = (file: File, maxMb: number) => file.size / 1024 / 1024 > maxMb

export const isSupportedFileType = (file: File, accept: string) => {
  const allowed = accept.split(',').map((t) => t.trim())
  return allowed.includes(file.type)
}
