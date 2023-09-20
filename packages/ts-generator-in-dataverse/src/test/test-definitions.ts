import { fetchDefinitions } from '../type-fetcher/fetchDefinitions.js'
import { authenticate } from '../utils/authenticate.js'

const credentials = await authenticate()
await fetchDefinitions(credentials.token)

export {}
