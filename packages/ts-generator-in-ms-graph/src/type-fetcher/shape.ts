import { TsEntity } from '@quasar-army/ts-generator'
import { GetPropertyTypeFunction, typeShapersMap } from './shapers/typeShapersMap.js'
import { GraphDefinition, GraphProperty } from '../types/MsGraph.js'
import { pluralize } from 'inflection'
import { pascalCase } from 'change-case'
import { fetchEnums } from '../enums-fetcher/fetchEnums.js'
import { fetchDefinitions } from './fetchDefinitions.js'
import { TsBelongsToDefinition, TsHasManyDefinition, TsBelongsToComplexFieldDefinition, TsHasManyComplexFieldDefinition } from '@quasar-army/ts-generator/types/types-fetcher/TsFieldDefinition.js'

function getShaperFunction (property: GraphProperty): GetPropertyTypeFunction | false {
  return typeShapersMap?.[property?._attributes.Type] ?? false
}

export async function shape (
  graphDefinition: GraphDefinition,
) {
  const enums = await fetchEnums()
  const enumsKeyed = enums.enumsKeyed

  const definitions = await fetchDefinitions()
  const definitionsKeyed = definitions.all
  const definitionsComplexKeyed = definitions.complexTypes

  const properties = graphDefinition.Property
  let navigationProperties = graphDefinition.NavigationProperty

  if (!Array.isArray(properties)) {
    throw new Error('graph definition "Property" must be an array.')
  }

  const entitySingular = graphDefinition._attributes.Name
  const entityPlural = pluralize(graphDefinition._attributes.Name)
  const namePascalSingular = pascalCase(graphDefinition._attributes.Name)

  const result: TsEntity = {
    entity: entityPlural,
    namePascal: namePascalSingular,
    primaryKey: 'id',
    fields: [],
  }

  result.fields.push({
    kind: 'rawField',
    fieldName: '@odata.type',
    nullable: true,
    types: [`'#microsoft.graph.${entitySingular}'`],
  })

  for (const property of properties) {
    const shaperFunction = getShaperFunction(property)
    const isGraph = property?._attributes?.Type?.startsWith('graph.')
    const isCollection = property?._attributes?.Type?.startsWith('Collection(graph.')
    if (
      !shaperFunction &&
      !isGraph &&
      !isCollection
    ) continue

    if (isGraph) {
      const typeSplit = property._attributes.Type.split('.')
      const graphKey = typeSplit[typeSplit.length - 1]
      // Handle is enum
      const foundEnum = enumsKeyed[graphKey]
      if (foundEnum) {
        result.fields.push({
          kind: 'enum',
          enumNamePascal: pascalCase(foundEnum._attributes.Name),
          enumName: foundEnum._attributes.Name,
          fieldName: foundEnum._attributes.Name,
          nullable: true,
        })
        continue
      }
      // handle is belongs to complex
      const foundRelatedComplexType = definitionsComplexKeyed[graphKey]
      if (foundRelatedComplexType) {
        const complexHasOneField: TsBelongsToComplexFieldDefinition = {
          kind: 'complexField',
          isArray: false,
          type: pascalCase(graphKey),
          fieldName: property._attributes.Name,
          nullable: true,
        }
        result.fields.push(complexHasOneField)
        continue
      }
    }

    if (isCollection) {
      const typeSplit = property._attributes.Type.split('.')
      const graphKey = typeSplit[typeSplit.length - 1].replace(')', '')

      // handle is has many complex
      const foundRelatedComplexType = definitionsComplexKeyed[graphKey]
      if (foundRelatedComplexType) {
        const complexHasManyField: TsHasManyComplexFieldDefinition = {
          kind: 'complexField',
          isArray: true,
          type: pascalCase(graphKey),
          fieldName: property._attributes.Name,
          nullable: true,
        }
        result.fields.push(complexHasManyField)
        continue
      }
    }

    if (!shaperFunction) continue

    const shapedData = await shaperFunction(property, graphDefinition)
    if (shapedData) {
      if (shapedData.fieldName === 'id') {
        shapedData.nullable = false
      }
      result.fields.push(shapedData)
    }
  }

  if (navigationProperties) {
    if (!Array.isArray(navigationProperties)) {
      navigationProperties = [navigationProperties]
    }
    for (const navigationProperty of navigationProperties) {
      // Handle Belongs To
      if (navigationProperty._attributes.Type.startsWith('graph.')) {
        const typeSplit = navigationProperty._attributes.Type.split('.')
        const graphKey = typeSplit[typeSplit.length - 1]
        const foreignKey = graphKey + 'Id'
        // const foreignKeyField: TsRawFieldDefinition = {
        //   kind: 'rawField',
        //   fieldName: foreignKey,
        //   nullable: true,
        //   types: ['string'],
        // }
        const belongsToField: TsBelongsToDefinition = {
          kind: 'relationship',
          relationshipType: 'belongsTo',
          fieldName: navigationProperty._attributes.Name,
          foreignKey,
          nullable: true,
          relatedEntityPascal: pascalCase(definitionsKeyed[graphKey]._attributes.Name),
        }
        result.fields.push(
          // foreignKeyField,
          belongsToField,
        )
        continue
      }
      // Handle Has Many
      if (navigationProperty._attributes.Type.startsWith('Collection(graph.')) {
        const typeSplit = navigationProperty._attributes.Type.split('.')
        const graphKey = typeSplit[typeSplit.length - 1].replace(')', '')
        const foreignKey = graphDefinition._attributes.Name + 'Id'
        const belongsToField: TsHasManyDefinition = {
          kind: 'relationship',
          relationshipType: 'hasMany',
          fieldName: navigationProperty._attributes.Name,
          foreignKey,
          nullable: true,
          relatedEntityPascal: pascalCase(definitionsKeyed[graphKey]._attributes.Name),
        }
        result.fields.push(belongsToField)
        continue
      }
    }
  }

  return result
}
