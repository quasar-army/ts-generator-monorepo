import { TsBelongsToManyDefinition } from '@quasar-army/ts-generator'
import { BelongsToManySchema } from '../types/RelationshipSchema.js'
import { pascalCase } from 'change-case'
import { singularize } from 'inflection'

export function shapeBelongsToManyAttribute (
  key: string,
  schema: BelongsToManySchema,
  schemas: Record<string, any>,
): TsBelongsToManyDefinition | false {
  const related = schemas[schema.items.$ref]

  return {
    kind: 'relationship',
    relatedEntityPascal: pascalCase(related.title),
    relationshipType: 'belongsToMany',
    fieldName: key,
    foreignPivotKey: schema.foreign_pivot_key,
    nullable: false,
    parentLocalKey: schema.parent_local_key,
    pivotEntityPascal: pascalCase(singularize(schema.pivot_entity)),
    relatedLocalKey: schema.related_local_key,
    relatedPivotKey: schema.related_pivot_key,
  }
}
