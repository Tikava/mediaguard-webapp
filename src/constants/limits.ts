import type { MediaTypeEnum } from '../types/api'

export const MAX_FILE_MB: Record<MediaTypeEnum, number> = {
  image: 10,
  video: 200,
  audio: 50,
}

export const ACCEPTED_TYPES = 'image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime,audio/mpeg,audio/wav,audio/ogg,audio/aac,audio/mp4'
