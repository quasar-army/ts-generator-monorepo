import { config as loadDotEnv } from 'dotenv'
import { DataverseEnumDefinition } from '../types/Dataverse.js'
loadDotEnv()

function makeFetchGlobalOptionSetUrl () {
  const api = process.env.DATAVERSE_API
  return `${api}/GlobalOptionSetDefinitions`
}

function makeFetchEntityDefinitionsUrl () {
  const api = process.env.DATAVERSE_API
  return `${api}/EntityDefinitions?$select=LogicalName`
}

function makeFetchEntityAttributesUrl (entityName: string) {
  const api = process.env.DATAVERSE_API
  return `${api}/EntityDefinitions(LogicalName='${entityName}')/Attributes`
}

export async function fetchOptionSets (token: string) {
  const headers = {
    Authorization: `bearer ${token}`,
  }

  // Fetch global Option Sets
  const responseGlobal = await fetch(makeFetchGlobalOptionSetUrl(), { headers })
  const dataGlobal = await responseGlobal.json() as { value: DataverseEnumDefinition[] }

  // Fetch entity names
  const responseEntities = await fetch(makeFetchEntityDefinitionsUrl(), { headers })
  const dataEntities = await responseEntities.json() as { value: { LogicalName: string }[] }
  const entityNames = dataEntities.value.map(entity => entity.LogicalName)

  // Fetch local Option Sets from each entity
  let localOptionSets: DataverseEnumDefinition[] = []
  for (const entityName of entityNames) {
    const responseAttributes = await fetch(makeFetchEntityAttributesUrl(entityName), { headers })
    const dataAttributes = await responseAttributes.json() as { value: any[] }
    const entityLocalOptionSets = dataAttributes.value
      .filter(attribute => 'OptionSet' in attribute)
      .map(attribute => attribute.OptionSet as DataverseEnumDefinition) // Assumes OptionSet and DataverseEnumDefinition have the same structure
    localOptionSets = localOptionSets.concat(entityLocalOptionSets)
  }

  // Return both global and local Option Sets
  return {
    global: dataGlobal.value,
    local: localOptionSets,
  }
}
