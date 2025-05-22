import { TsRelationshipFieldDefinition } from '@quasar-army/ts-generator'

const relationshipPiniaOrmNameMap = {
  hasMany: 'HasMany',
  belongsTo: 'BelongsTo',
  hasOne: 'HasOne',
  belongsToMany: 'BelongsToMany'
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
    
    if(
      relationship.relationshipType === 'hasMany' ||
      relationship.relationshipType === 'belongsTo' ||
      relationship.relationshipType === 'hasOne'
    ) {
      snippet += `@${relationshipName}(() => ${relatedPascals}, '${relationship.foreignKey}') declare ${relationship.fieldName}`
    }

    if(relationshipName === 'BelongsToMany' && relationship.relationshipType === 'belongsToMany') {
      snippet += `@${relationshipName}(() => ${relatedPascals}, () => ${relationship.pivotEntityPascal}, '${relationship.foreignPivotKey}', '${relationship.relatedPivotKey}', '${relationship.parentLocalKey}', '${relationship.relatedLocalKey}') declare ${relationship.fieldName}`
    }

    snippet += ': '

    const types = ['HasMany', 'BelongsToMany'].includes(relationshipName) ? relatedPascals.map(related => related + '[]') : relatedPascals
    if (relationship.nullable) types.push('null')
    snippet += types.join(' | ')

    result.push(snippet)
  })

  return result.join('\n')
}
