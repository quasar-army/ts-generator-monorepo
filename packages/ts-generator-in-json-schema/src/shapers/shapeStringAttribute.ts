import { TsFieldDefinition } from '@quasar-army/ts-generator'
import { FieldSchema } from '../types/FieldSchema.js'

export function shapeStringAttribute (
  key: string,
  schema: FieldSchema,
  schemas: Record<string, any>,
): TsFieldDefinition | false {
  return {
    kind: 'rawField',
    fieldName: key,
    nullable: true,
    types: ['string'],
  }
}
