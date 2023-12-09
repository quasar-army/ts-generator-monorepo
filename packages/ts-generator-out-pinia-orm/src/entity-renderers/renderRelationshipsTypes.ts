import { TsRelationshipFieldDefinition } from '@quasar-army/ts-generator'

const relationshipPiniaOrmNameMap = {
  hasMany: 'HasMany',
  belongsTo: 'BelongsTo',
  hasOne: 'HasOne',
}

export function renderRelationshipsTypes(
  relationships: TsRelationshipFieldDefinition[],
  indent: string,
) {
  const result = []

  relationships.forEach(relationship => {
    const relationshipName = relationshipPiniaOrmNameMap[relationship.relationshipType]
    let relatedPascals: string[] = []
    if (Array.isArray(relationship.relatedEntityPascal)) {
      relatedPascals = relationship.relatedEntityPascal
        .map(relatedPascal => relatedPascal)
    } else {
      relatedPascals = [relationship.relatedEntityPascal]
    }

    let snippet = ''
    snippet += indent
    snippet += `@${relationshipName}(() => ${relatedPascals}, '${relationship.foreignKey}') declare ${relationship.fieldName}`
    snippet += ': '

    const types = relationshipName === 'HasMany' ? relatedPascals.map(related => related + '[]') : relatedPascals
    if (relationship.nullable) types.push('null')
    snippet += types.join(' | ')

    result.push(snippet)
  })

  return result.join('\n')
}
