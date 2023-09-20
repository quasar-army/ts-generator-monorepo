import { TsBelongsToDefinition } from '@quasar-army/ts-generator'
import { BelongsToSchema } from '../types/RelationshipSchema.js'
import { pascalCase } from 'change-case'

export function shapeBelongsToAttribute (
  key: string,
  schema: BelongsToSchema,
  schemas: Record<string, any>,
): TsBelongsToDefinition | false {
  const related = schemas[schema.$ref]

  return {
    kind: 'relationship',
    foreignKey: schema.foreign_key,
    relatedEntityPascal: pascalCase(related.title),
    relationshipType: 'belongsTo',
    fieldName: key,
    nullable: true,
  }
}
