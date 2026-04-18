const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:8000'

const ACCESS_KEY = 'mg_access'
const REFRESH_KEY = 'mg_refresh'

export const tokenStorage = {
  getAccess: (): string | null => localStorage.getItem(ACCESS_KEY),
  getRefresh: (): string | null => localStorage.getItem(REFRESH_KEY),
  setTokens: (access: string, refresh: string): void => {
    localStorage.setItem(ACCESS_KEY, access)
    localStorage.setItem(REFRESH_KEY, refresh)
  },
  setAccess: (access: string): void => {
    localStorage.setItem(ACCESS_KEY, access)
  },
  clear: (): void => {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
  },
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = tokenStorage.getRefresh()
  if (!refresh) return null
  try {
    const res = await fetch(`${BASE_URL}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    })
    if (!res.ok) {
      tokenStorage.clear()
      return null
    }
    const data = (await res.json()) as { access: string; refresh?: string }
    tokenStorage.setAccess(data.access)
    if (data.refresh) tokenStorage.setTokens(data.access, data.refresh)
    return data.access
  } catch {
    return null
  }
}

async function request<T>(url: string, init: RequestInit, retry = true): Promise<T> {
  const access = tokenStorage.getAccess()
  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string> | undefined),
  }
  if (access) headers['Authorization'] = `Bearer ${access}`

  const res = await fetch(`${BASE_URL}${url}`, { ...init, headers })

  if (res.status === 401 && retry) {
    const newAccess = await refreshAccessToken()
    if (newAccess) return request<T>(url, init, false)
    throw new Error('Unauthorized')
  }

  if (!res.ok) {
    let message = `HTTP ${res.status}`
    try {
      const err = (await res.json()) as Record<string, unknown>
      message =
        (err['detail'] as string | undefined) ??
        (err['message'] as string | undefined) ??
        message
    } catch {
      // keep default message
    }
    throw new Error(message)
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export const httpClient = {
  get<T>(url: string): Promise<T> {
    return request<T>(url, { method: 'GET' })
  },
  post<T>(url: string, body: unknown): Promise<T> {
    return request<T>(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  },
  postForm<T>(url: string, formData: FormData): Promise<T> {
    return request<T>(url, { method: 'POST', body: formData })
  },
  delete<T>(url: string): Promise<T> {
    return request<T>(url, { method: 'DELETE' })
  },
}
