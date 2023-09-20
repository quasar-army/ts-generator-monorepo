import { pascalCase } from 'change-case'
import { cachedDefinitionsKeyedByEntityName } from './fetchDefinitions.js'
import { DataverseDefinition } from '../types/Dataverse.js'

function makePascalName (dataverseDefinition: DataverseDefinition) {
  return pascalCase(dataverseDefinition.DisplayName.LocalizedLabels[0]?.Label ?? dataverseDefinition.SchemaName)
}

export async function fetchEntitiesSchemaName (entity: string) {
  return makePascalName(cachedDefinitionsKeyedByEntityName[entity])
}
