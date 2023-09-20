import { TsFieldDefinition } from '@quasar-army/ts-generator'
import { DataverseAttribute, DataverseDefinition } from '../../types/Dataverse.js'

export function shapeStringAttribute (
  attribute: DataverseAttribute,
  definition: DataverseDefinition,
): TsFieldDefinition | false {
  if (!attribute.LogicalName?.includes('yomi') && !attribute.AttributeOf) {
    return {
      kind: 'rawField',
      fieldName: attribute.LogicalName,
      nullable: true,
      types: ['string'],
    }
  }
  return false
}
