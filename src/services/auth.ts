import { httpClient, tokenStorage } from './httpClient'
import type { TokenObtainPair, UserProfile, Register } from '../types/api'

export async function login(username: string, password: string): Promise<void> {
  const tokens = await httpClient.post<TokenObtainPair>('/api/auth/login/', { username, password })
  tokenStorage.setTokens(tokens.access, tokens.refresh)
}

export async function logout(): Promise<void> {
  const refresh = tokenStorage.getRefresh()
  if (refresh) {
    try {
      await httpClient.post<void>('/api/auth/logout/', { refresh })
    } catch {
      // best-effort: clear tokens regardless
    }
  }
  tokenStorage.clear()
}

export async function register(
  username: string,
  email: string,
  password: string,
  password2: string,
): Promise<Register> {
  return httpClient.post<Register>('/api/auth/register/', { username, email, password, password2 })
}

export async function getProfile(): Promise<UserProfile> {
  return httpClient.get<UserProfile>('/api/auth/profile/')
}
