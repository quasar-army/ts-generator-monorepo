import { config as loadDotEnv } from 'dotenv'
import NodeCache from 'node-cache'
loadDotEnv()

const cache = new NodeCache()

export interface FetchEntitiesSchemaNameResponse {
  '@odata.context': string
  SchemaName: string
  MetadataId: string
}

function makeFetchEntitiesUrl (entity: string) {
  const api = process.env.DATAVERSE_API
  return `${api}/EntityDefinitions(LogicalName='${entity}')?$select=SchemaName`
}

export async function fetchEntitiesSchemaName (token: string, entity) {
  const headers = {
    Authorization: `bearer ${token}`,
  }

  const cacheKey = 'fetchEntitiesSchemaName:' + entity

  if (cache.has(cacheKey)) {
    return cache.get<FetchEntitiesSchemaNameResponse>(cacheKey).SchemaName
  }

  const response = await fetch(makeFetchEntitiesUrl(entity), { headers })
  const data = (await response.json()) as FetchEntitiesSchemaNameResponse

  cache.set(cacheKey, data)

  return data.SchemaName
}
