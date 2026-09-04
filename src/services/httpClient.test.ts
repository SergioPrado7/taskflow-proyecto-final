import axios from 'axios'
import { describe, expect, it } from 'vitest'
import { getApiErrorMessage } from './httpClient'

describe('getApiErrorMessage', () => {
  it('returns a friendly message for unauthorized responses', () => {
    const error = new axios.AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, undefined, {
      data: {},
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: { headers: new axios.AxiosHeaders() },
    })

    expect(getApiErrorMessage(error)).toBe('Usuario o contraseña incorrectos.')
  })

  it('preserves regular errors', () => {
    expect(getApiErrorMessage(new Error('Sin conexión'))).toBe('Sin conexión')
  })
})
