import { TsFieldDefinition } from '@quasar-army/ts-generator'
import { DataverseAttribute, DataverseDefinition } from '../../types/Dataverse.js'

export function shapeEntityNameAttribute (
  attribute: DataverseAttribute,
  definition: DataverseDefinition,
): TsFieldDefinition | false {
  return {
    kind: 'rawField',
    fieldName: `_${attribute.AttributeOf}_value`,
    nullable: true,
    types: ['string'],
  }
}
