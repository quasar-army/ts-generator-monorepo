import { TsFieldDefinition } from '@quasar-army/ts-generator'
import { DataverseAttribute, DataverseDefinition } from '../../types/Dataverse.js'

export function shapeDateTimeAttribute (
  attribute: DataverseAttribute,
  definition: DataverseDefinition,
): TsFieldDefinition | false {
  return {
    kind: 'rawField',
    fieldName: attribute.LogicalName,
    nullable: true,
    types: ['string'],
  }
}
