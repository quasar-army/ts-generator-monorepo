import { EntityOutput, TsComplexFieldDefinition, TsEntity, TsEnumDefinition, TsRawFieldDefinition, TsRelationshipFieldDefinition } from '@quasar-army/ts-generator'
import { renderDecoratorImports } from './entity-renderers/renderDecoratorImports.js'
import { renderFieldTypes } from './entity-renderers/renderFieldTypes.js'
import { renderRelationshipsTypes } from './entity-renderers/renderRelationshipsTypes.js'
import { renderRelationshipImports } from './entity-renderers/renderRelationshipImports.js'
import { renderEnumImports } from './entity-renderers/renderEnumImports.js'
import { renderEnumFieldTypes } from './entity-renderers/renderEnumFieldTypes.js'
import { renderComplexFieldTypes } from './entity-renderers/renderComplexFieldTypes.js'
import { renderComplexTypeImports } from './entity-renderers/renderComplexTypeImports.js'

const indent = '  '

export function composeMakeEntityType (options: {
  enumsDir?: string
  interfaceImportDir?: string
}) {
  return async function makeEntityType (
    entityDefinition: TsEntity,
  ): Promise<EntityOutput> {
    const entityPascal = entityDefinition.namePascal

    const fields = entityDefinition.fields.filter(field => field.kind === 'rawField') as TsRawFieldDefinition[]
    const relationships = entityDefinition.fields.filter(field => field.kind === 'relationship') as TsRelationshipFieldDefinition[]
    const enums = entityDefinition.fields.filter(field => field.kind === 'enum') as TsEnumDefinition[]
    const complexFields = entityDefinition.fields.filter(field => field.kind === 'complexField') as TsComplexFieldDefinition[]

    /**
     * Imports
     */
    let template = "import { Model } from 'pinia-orm'\n"

    const decoratorImports = renderDecoratorImports(relationships, fields)
    const relationshipImports = renderRelationshipImports(relationships, entityDefinition, { modelImportDir: './' })
    const enumImports = renderEnumImports(enums, { enumImportDir: options.enumsDir || '../dataverse-enums/' })
    const complexTypeImports = renderComplexTypeImports(complexFields, { interfaceImportDir: options.interfaceImportDir || '../raw-types/' })

    template += decoratorImports ? (decoratorImports + '\n\n') : ''
    template += relationshipImports ? (relationshipImports + '\n\n') : ''
    template += enumImports ? (enumImports + '\n\n') : ''
    template += complexTypeImports ? (complexTypeImports + '\n\n') : ''

    if (!decoratorImports && !relationshipImports && !enumImports && !complexTypeImports) {
      template += '\n'
    }

    template += `export class ${entityPascal} extends Model {\n`
    template += `${indent}static entity = '${entityDefinition.entity}'\n`
    template += `${indent}static primaryKey = '${entityDefinition.primaryKey}'`

    /**
     * Fields
     */
    const renderedFieldTypes = renderFieldTypes(fields, indent)
    if (renderedFieldTypes) {
      template += '\n\n'
      template += `${indent}// fields\n`
      template += renderedFieldTypes
    }

    /**
     * Enum Fields
     */
    const renderedEnumFieldTypes = renderEnumFieldTypes(enums, indent)
    if (renderedEnumFieldTypes) {
      template += '\n\n'
      template += `${indent}// enums\n`
      template += renderedEnumFieldTypes
    }

    /**
     * Complex Fields
     */
    const renderedComplexFieldTypes = renderComplexFieldTypes(complexFields, indent)
    if (renderedComplexFieldTypes) {
      template += '\n\n'
      template += `${indent}// complex fields\n`
      template += renderedComplexFieldTypes
    }

    /**
     * Relationship Fields
     */
    const renderedRelationshipTypes = renderRelationshipsTypes(relationships, indent)
    if (renderedRelationshipTypes) {
      template += '\n\n'

      template += `${indent}// relationships\n`
      template += renderedRelationshipTypes
    }

    template += '\n}\n'

    return {
      definition: entityDefinition,
      entityName: entityDefinition.entity,
      file: template,
    }
  }
}
