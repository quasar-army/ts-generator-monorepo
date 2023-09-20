import { TsFieldDefinition } from '@quasar-army/ts-generator'
import { DataverseAttribute, DataverseDefinition } from '../../types/Dataverse.js'

export function shapeVirtualAttribute (
  attribute: DataverseAttribute,
  definition: DataverseDefinition,
): TsFieldDefinition | false {
  return false
}
