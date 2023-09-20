import { config as loadDotEnv } from 'dotenv'
import { xml2js } from 'xml-js'
import { GraphDefinition } from '../types/MsGraph.js'
import { keyBy, uniqBy } from 'lodash-es'
import { flattenEntityHierarchy } from './flattenEntityHierarchy.js'

loadDotEnv()

export interface Definitions {
  entities: Record<string, GraphDefinition>
  complexTypes: Record<string, GraphDefinition>
  all: Record<string, GraphDefinition>
}

let cachedDefinitions: Definitions | undefined

function makeFetchDefinitionsUrl () {
  const api = process.env.MICROSOFT_GRAPH_API
  const apiVersion = process.env.MICROSOFT_GRAPH_API_VERSION
  return `${api}/${apiVersion}/$metadata`
}

function entityMap (entity: GraphDefinition, isComplex: boolean) {
  const entityWithArrayProperty = entity
  entityWithArrayProperty.isComplex = isComplex
  if (!Array.isArray(entityWithArrayProperty.Property)) {
    if (!entityWithArrayProperty.Property) {
      entityWithArrayProperty.Property = []
    } else {
      entityWithArrayProperty.Property = [entityWithArrayProperty.Property]
    }
  }
  return entityWithArrayProperty
}

export async function fetchDefinitions (): Promise<Definitions> {
  if (cachedDefinitions) {
    return cachedDefinitions
  }

  console.log('fetching definitions: ' + makeFetchDefinitionsUrl())
  cachedDefinitions = {
    all: {},
    complexTypes: {},
    entities: {},
  }
  const response = await fetch(makeFetchDefinitionsUrl())
  const responseData = await response.text()
  if (!response.ok) {
    throw new Error(`request error: ${response.status}`)
  }
  const data = xml2js(responseData, { compact: true })
  const schemas = data['edmx:Edmx']['edmx:DataServices'].Schema

  const bareEntityTypes = uniqBy(
    (schemas[0].EntityType as GraphDefinition[])
      .map(entity => entityMap(entity, false)),
    entityType => entityType._attributes.Name,
  )
  const bareComplexTypes = uniqBy(
    (schemas[0].ComplexType as GraphDefinition[])
      .map(entity => entityMap(entity, true)),
    entityType => entityType._attributes.Name,
  )

  const bareEntitiesKeyed = keyBy(bareEntityTypes, bareEntity => {
    return bareEntity._attributes.Name
  })
  const bareComplexKeyed = keyBy(bareComplexTypes, bareComplex => {
    return bareComplex._attributes.Name
  })

  const allEntitiesKeyed = { ...bareEntitiesKeyed, ...bareComplexKeyed }

  const entities = bareEntityTypes.map(bareEntity => flattenEntityHierarchy(bareEntity, allEntitiesKeyed))
  const complexTypes = bareComplexTypes.map(bareComplex => flattenEntityHierarchy(bareComplex, allEntitiesKeyed))

  const entitiesKeyed = keyBy(entities, entity => entity._attributes.Name)
  const complexTypesKeyed = keyBy(complexTypes, complexType => complexType._attributes.Name)

  const result: Definitions = {
    entities: entitiesKeyed,
    complexTypes: complexTypesKeyed,
    all: { ...entitiesKeyed, ...complexTypesKeyed },
  }

  cachedDefinitions = result

  return result
}
