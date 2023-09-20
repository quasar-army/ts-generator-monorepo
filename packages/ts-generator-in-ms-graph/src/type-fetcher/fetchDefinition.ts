import { config as loadDotEnv } from 'dotenv'
import { xml2js } from 'xml-js'
import { GraphDefinition } from '../types/MsGraph.js'
import { keyBy } from 'lodash-es'
import { flattenEntityHierarchy } from './flattenEntityHierarchy.js'

loadDotEnv()

function makeFetchDefinitionUrl () {
  const api = process.env.MICROSOFT_GRAPH_API
  const apiVersion = process.env.MICROSOFT_GRAPH_API_VERSION
  return `${api}/${apiVersion}/$metadata`
}

export async function fetchDefinition (
  entityType: string,
  options: { complex?: boolean } = {},
) {
  const response = await fetch(makeFetchDefinitionUrl())
  const responseData = await response.text()
  if (!response.ok) {
    throw new Error(`request error: ${response.status}`)
  }
  const data = xml2js(responseData, { compact: true })
  const schemas = data['edmx:Edmx']['edmx:DataServices'].Schema

  const schemaField = options.complex ? 'ComplexType' : 'EntityType'

  const bareEntities = schemas[0][schemaField] as GraphDefinition[]
  const bareEntitiesKeyed = keyBy(bareEntities, bareEntity => {
    return bareEntity._attributes.Name
  })

  const bareEntity = schemas[0]
    .EntityType
    .find(entitySchema => entitySchema._attributes.Name === entityType) as GraphDefinition

  const entity = flattenEntityHierarchy(bareEntity, bareEntitiesKeyed)

  if (!entity) {
    throw new Error(`could not find entity "${entityType}"`)
  }

  return entity
}
