import { TsFieldDefinition } from '@quasar-army/ts-generator'
import { FieldSchema } from '../types/FieldSchema.js'

export function shapeComplexAttribute (
  key: string,
  schema: FieldSchema,
  schemas: Record<string, any>,
): TsFieldDefinition | false {
  return {
    kind: 'rawField',
    fieldName: key,
    nullable: true,
    types: ['any'],
  }
}
