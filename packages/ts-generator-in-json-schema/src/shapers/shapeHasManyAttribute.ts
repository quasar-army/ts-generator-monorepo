import { TsHasManyDefinition } from '@quasar-army/ts-generator'
import { HasManySchema } from '../types/RelationshipSchema.js'
import { pascalCase } from 'change-case'

export function shapeHasManyAttribute (
  key: string,
  schema: HasManySchema,
  schemas: Record<string, any>,
): TsHasManyDefinition | false {
  const related = schemas[schema.items.$ref]

  return {
    kind: 'relationship',
    foreignKey: schema.foreign_key,
    relatedEntityPascal: pascalCase(related.title),
    relationshipType: 'hasMany',
    fieldName: key,
    nullable: false,
  }
}
