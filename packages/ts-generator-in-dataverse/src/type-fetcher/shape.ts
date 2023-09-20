import { TsEntity } from '@quasar-army/ts-generator'
import { GetAttributeTypeFunction, typeShapersMap } from './shapers/typeShapersMap.js'
import { DataverseAttribute, DataverseDefinition } from '../types/Dataverse.js'
import { pluralize, singularize } from 'inflection'
import { pascalCase } from 'change-case'

function getShaperFunction (attribute: DataverseAttribute): GetAttributeTypeFunction | false {
  return typeShapersMap?.[attribute.AttributeType] ?? false
}

function makePascalName (dataverseDefinition: DataverseDefinition) {
  return pascalCase(dataverseDefinition.DisplayName.LocalizedLabels[0]?.Label ?? dataverseDefinition.SchemaName)
}

export async function shape (
  dataverseDefinition: DataverseDefinition,
) {
  const attributes = dataverseDefinition.Attributes
  const entityName = dataverseDefinition.LogicalCollectionName ?? pluralize(dataverseDefinition.LogicalName)
  const namePascalSingular = makePascalName(dataverseDefinition)
  const primaryKey = `${singularize(entityName)}id`

  const result: TsEntity = {
    entity: entityName,
    namePascal: namePascalSingular,
    primaryKey,
    fields: [],
  }

  for (const attribute of attributes) {
    const shaperFunction = getShaperFunction(attribute)
    if (!shaperFunction) continue

    const shapedData = await shaperFunction(attribute, dataverseDefinition)
    if (shapedData) {
      if (shapedData.fieldName === primaryKey) {
        shapedData.nullable = false
      }

      result.fields.push(shapedData)
    }
  }

  return result
}
