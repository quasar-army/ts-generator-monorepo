import { TsFieldDefinition } from '@quasar-army/ts-generator'
import { DataverseAttribute, DataverseDefinition } from '../../types/Dataverse.js'

export function shapePicklistAttribute (
  attribute: DataverseAttribute,
  definition: DataverseDefinition,
): TsFieldDefinition | false {
  const virtualField = definition.Attributes.find(currentAttribute => {
    return currentAttribute.LogicalName === (attribute.LogicalName + 'name') &&
      currentAttribute.AttributeType === 'Virtual'
  })

  if (!virtualField) {
    return false
  }

  return {
    kind: 'rawField',
    types: ['any'],
    fieldName: attribute.LogicalName,
    nullable: true,
  }
}
