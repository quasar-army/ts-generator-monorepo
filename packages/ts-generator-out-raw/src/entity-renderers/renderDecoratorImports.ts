import { TsRelationshipFieldDefinition } from '@quasar-army/ts-generator'
import { uniq } from 'lodash-es'

const relationshipNamesMap = {
  belongsTo: 'BelongsTo',
  hasMany: 'HasMany',
}

export function renderDecoratorImports (
  relationships: TsRelationshipFieldDefinition[],
) {
  const decoratorImports = ['Attr']

  const relationshipTypes = uniq(relationships.flatMap(field => field.relationshipType))
    .map(relationshipType => relationshipNamesMap[relationshipType])
  decoratorImports.push(...relationshipTypes)

  const result = `import { ${decoratorImports.join(', ')} } from 'pinia-orm/dist/decorators'`

  return result
}
