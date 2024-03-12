import { TsHasOneDefinition } from '@quasar-army/ts-generator'
import { HasOneSchema } from '../types/RelationshipSchema.js'
import { pascalCase } from 'change-case'

export function shapeHasOneAttribute (
  key: string,
  schema: HasOneSchema,
  schemas: Record<string, any>,
): TsHasOneDefinition | false {
  const related = schemas[schema.items.$ref]

  return {
    kind: 'relationship',
    foreignKey: schema.foreign_key,
    relatedEntityPascal: pascalCase(related.title),
    relationshipType: 'hasOne',
    fieldName: key,
    nullable: true,
  }
}
