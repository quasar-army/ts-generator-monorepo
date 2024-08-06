import { TsRawFieldDefinition, TsRelationshipFieldDefinition } from '@quasar-army/ts-generator'
import { uniq } from 'lodash-es'

const relationshipNamesMap = {
  belongsTo: 'BelongsTo',
  hasMany: 'HasMany',
  hasOne: 'HasOne',
}

export function renderDecoratorImports (
  relationships: TsRelationshipFieldDefinition[],
  fields: TsRawFieldDefinition[],
) {
  const decoratorImports = ['Uid']
  if (fields.length) {
    decoratorImports.push('Attr')
  }

  const relationshipTypes = uniq(relationships.flatMap(field => field.relationshipType))
    .map(relationshipType => relationshipNamesMap[relationshipType])
  decoratorImports.push(...relationshipTypes)

  if (!decoratorImports.length) {
    return ''
  }

  const result = `import { ${decoratorImports.join(', ')} } from 'pinia-orm/dist/decorators'`

  return result
}
