import { TsFieldDefinition } from '@quasar-army/ts-generator'
import { DataverseAttribute, DataverseDefinition, DataverseRawAttributeType } from '../../types/Dataverse.js'
import { shapeStatusAttribute } from './shapeStatusAttribute.js'
import { shapeStringAttribute } from './shapeStringAttribute.js'
import { shapeVirtualAttribute } from './shapeVirtualAttribute.js'
import { shapeStateAttribute } from './shapeStateAttribute.js'
import { shapeBigIntAttribute } from './shapeBigIntAttribute.js'
import { shapeBooleanAttribute } from './shapeBooleanAttribute.js'
import { shapeDateTimeAttribute } from './shapeDateTimeAttribute.js'
import { shapeEntityNameAttribute } from './shapeEntityNameAttribute.js'
import { shapeIntegerAttribute } from './shapeIntegerAttribute.js'
import { shapeUniqueIdentifierAttribute } from './shapeUniqueIdentifierAttribute.js'
import { shapeLookupAttribute } from './shapeLookupAttribute.js'
import { shapePicklistAttribute } from './shapePicklistAttribute.js'

export type GetAttributeTypeFunction = (
  attribute: DataverseAttribute,
  definition: DataverseDefinition
) => Promise<TsFieldDefinition | false> | TsFieldDefinition | false

export const typeShapersMap: Partial<Record<
  DataverseRawAttributeType,
  GetAttributeTypeFunction
>> = {
  String: shapeStringAttribute,
  Status: shapeStatusAttribute,
  Virtual: shapeVirtualAttribute,
  State: shapeStateAttribute,
  BigInt: shapeBigIntAttribute,
  DateTime: shapeDateTimeAttribute,
  EntityName: shapeEntityNameAttribute,
  Integer: shapeIntegerAttribute,
  Uniqueidentifier: shapeUniqueIdentifierAttribute,
  Lookup: shapeLookupAttribute,
  Boolean: shapeBooleanAttribute,
  Picklist: shapePicklistAttribute,
}
