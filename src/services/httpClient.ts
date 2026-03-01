const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export type HttpMethod = 'GET' | 'POST'

export const httpClient = {
  async get<T>(url: string): Promise<T> {
    console.log('GET', url)
    await delay(400)
    throw new Error(`No backend configured for ${url}`)
  },
  async post<T>(url: string, body: unknown): Promise<T> {
    console.log('POST', url, body)
    await delay(400)
    throw new Error(`No backend configured for ${url}`)
  },
}
