import { TsEntity, TsRelationshipFieldDefinition } from '@quasar-army/ts-generator'
import { uniqBy } from 'lodash-es'

export function renderRelationshipImports (
  relationships: TsRelationshipFieldDefinition[],
  entityDefinition: TsEntity,
  options: { modelImportDir: string } = { modelImportDir: './' },
) {
  const result = []

  const uniqRelationships = uniqBy(relationships, 'relatedEntityPascal')
  const entityPascal = entityDefinition.namePascal

  uniqRelationships.forEach(relationship => {
    function addRelatedEntity (relatedEntityPascal: string) {
      const relatedPascal = relatedEntityPascal

      if (relatedPascal === entityPascal) {
        return
      }

      let snippet = `import { ${relatedPascal} } `
      snippet += `from '${options.modelImportDir}${relatedPascal}'`

      result.push(snippet)
    }

    if (Array.isArray(relationship.relatedEntityPascal)) {
      relationship.relatedEntityPascal.forEach(entity => addRelatedEntity(entity))
    } else {
      addRelatedEntity(relationship.relatedEntityPascal)
    }
  })

  return result.join('\n')
}
