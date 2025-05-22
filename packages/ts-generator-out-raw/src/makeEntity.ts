import { TsEntity, TsRawFieldDefinition, TsRelationshipFieldDefinition } from '@quasar-army/ts-generator'
import { renderDecoratorImports } from './entity-renderers/renderDecoratorImports.js'
import { singularize } from 'inflection'
import { renderFieldTypes } from './entity-renderers/renderFieldTypes.js'
import { renderRelationshipsTypes } from './entity-renderers/renderRelationshipsTypes.js'
import { renderRelationshipImports } from './entity-renderers/renderRelationshipImports.js'

const indent = '  '

export const makeEntity = (entityDefinition: TsEntity) => {
  const entitySingular = singularize(entityDefinition.entity)
  const entityPascal = entityDefinition.namePascal

  const fields = entityDefinition.fields.filter(field => field.kind === 'rawField') as TsRawFieldDefinition[]
  const relationships = entityDefinition.fields.filter(field => field.kind === 'relationship') as TsRelationshipFieldDefinition[]

  let template = "import { Model } from 'pinia-orm'\n"

  template += renderDecoratorImports(relationships) + '\n'
  template += renderRelationshipImports(relationships, entityDefinition, { modelImportDir: './' }) + '\n\n'

  template += `export class ${entityPascal} extends Model {\n`
  template += `${indent}static entity = '${entityDefinition.entity}'\n`
  template += `${indent}static override primaryKey = '${entitySingular}id'\n\n`

  template += `${indent}// fields\n`
  template += renderFieldTypes(fields, indent)

  template += '\n\n'

  template += `${indent}// relationships\n`
  template += renderRelationshipsTypes(relationships, indent)

  template += '\n}\n'

  return template
}
