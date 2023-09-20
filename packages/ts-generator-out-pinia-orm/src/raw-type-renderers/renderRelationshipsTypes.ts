import { TsRelationshipFieldDefinition } from '@quasar-army/ts-generator'

export function renderRelationshipsTypes (
  relationships: TsRelationshipFieldDefinition[],
  indent: string,
) {
  const result = []

  relationships.forEach(relationship => {
    let relatedPascals: string[] = []
    if (Array.isArray(relationship.relatedEntityPascal)) {
      relatedPascals = relationship.relatedEntityPascal
        .map(relatedPascal => relatedPascal)
    } else {
      relatedPascals = [relationship.relatedEntityPascal]
    }

    const relatedPascal = relatedPascals[0]

    let snippet = ''
    snippet += indent
    snippet += relationship.fieldName
    snippet += ': '

    if (relationship.relationshipType === 'belongsTo') {
      snippet += `${relatedPascal} | null`
    } else {
      snippet += `${relatedPascal}[]`
    }

    result.push(snippet)
  })

  return result.join('\n')
}
