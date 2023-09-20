import { config as loadDotEnv } from 'dotenv'
import { fetchDefinitions } from './fetchDefinitions.js'
loadDotEnv()

export async function fetchDefinition (token: string, entity: string) {
  const { cachedDefinitionsKeyedByEntityName } = await fetchDefinitions(token)

  return cachedDefinitionsKeyedByEntityName[entity]
}
