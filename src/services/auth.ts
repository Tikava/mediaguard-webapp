import { tokenStorage } from './httpClient'
import type { UserProfile, Register } from '../types/api'
import { MOCK_USER } from './mockData'

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

export async function login(username: string, password: string): Promise<void> {
  await delay(800)
  tokenStorage.setTokens('mock-access-token', 'mock-refresh-token')
}

export async function logout(): Promise<void> {
  await delay(300)
  tokenStorage.clear()
}

export async function register(
  username: string,
  email: string,
  password: string,
  password2: string,
): Promise<Register> {
  await delay(1000)
  return { username, email }
}

export async function getProfile(): Promise<UserProfile> {
  await delay(400)
  return { ...MOCK_USER }
}
