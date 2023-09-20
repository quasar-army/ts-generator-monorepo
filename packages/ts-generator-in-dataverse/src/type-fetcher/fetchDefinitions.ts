import { config as loadDotEnv } from 'dotenv'
import { saveObjectToFile } from '../utils/saveObjectToFile.js'
import path from 'path'
import { checkFileExists } from '../utils/checkFileExists.js'
import { readFile } from 'fs/promises'
import { keyBy } from 'lodash-es'
import { FetchDefinitionsResponse, DataverseDefinition } from '../types/Dataverse.js'
loadDotEnv()

function makeFetchDefinitionUrl () {
  const api = process.env.DATAVERSE_API
  return `${api}/EntityDefinitions?$expand=Attributes`
}

export let cachedDefinitions: FetchDefinitionsResponse | undefined
export let cachedDefinitionsKeyedByEntityName: Record<string, DataverseDefinition> | undefined

export async function fetchDefinitions (token: string): Promise<{
  cachedDefinitions: FetchDefinitionsResponse | undefined
  cachedDefinitionsKeyedByEntityName: Record<string, DataverseDefinition> | undefined
}> {
  if (cachedDefinitions && cachedDefinitionsKeyedByEntityName) {
    return {
      cachedDefinitions,
      cachedDefinitionsKeyedByEntityName,
    }
  }

  if (
    process.env.DATAVERSE_SAVE_ENTITY_DEFINITIONS &&
    await checkFileExists(path.resolve('./.cache/all-definitions.json'))
  ) {
    const definitionsFromFileCache = await readFile(path.resolve('./.cache/all-definitions.json'))
    cachedDefinitions = definitionsFromFileCache.toJSON() as unknown as FetchDefinitionsResponse
    cachedDefinitionsKeyedByEntityName = keyBy(cachedDefinitions.value, 'LogicalName')
    return {
      cachedDefinitions,
      cachedDefinitionsKeyedByEntityName,
    }
  }

  const headers = {
    Authorization: `bearer ${token}`,
  }

  const response = await fetch(makeFetchDefinitionUrl(), { headers })
  try {
    const data = await response.json() as unknown as FetchDefinitionsResponse

    cachedDefinitions = data
    cachedDefinitionsKeyedByEntityName = keyBy(data.value, 'LogicalName')

    if (process.env.DATAVERSE_SAVE_ENTITY_DEFINITIONS) {
      await saveObjectToFile(data, path.resolve('./.cache/all-definitions.json'))
    }

    return {
      cachedDefinitions,
      cachedDefinitionsKeyedByEntityName,
    }
  } catch (error) {
    if (error.data.error) {
      throw new Error(error.data.error?.message ?? `request error: ${response.status}`)
    }
    throw new Error('Error fetching definitions', error)
  }
}
