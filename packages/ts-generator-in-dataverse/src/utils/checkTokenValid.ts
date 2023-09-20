import { AuthCredentials } from './authenticate.js'

export function checkTokenValid (credentials: AuthCredentials) {
  if (!credentials?.expiresOn) {
    return false
  }

  const expiresOnDate = (new Date(credentials.expiresOn)).getTime()
  const now = (new Date()).getTime()

  return now < expiresOnDate
}
