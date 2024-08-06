import { ComplexTypeOutput, TsEntity, TsEnumDefinition, TsRawFieldDefinition, TsRelationshipFieldDefinition } from '@quasar-army/ts-generator'
import { renderRelationshipImports } from './raw-type-renderers/renderRelationshipImports.js'
import { renderEnumImports } from './raw-type-renderers/renderEnumImports.js'
import { renderFieldTypes } from './raw-type-renderers/renderFieldTypes.js'
import { renderEnumFieldTypes } from './raw-type-renderers/renderEnumFieldTypes.js'
import { renderRelationshipsTypes } from './raw-type-renderers/renderRelationshipsTypes.js'

const indent = '  '

export function composeMakeComplexType (options: {
  enumsDir?: string
  interfaceImportDir?: string
}) {
  return async function makeEntityType (
    entityDefinition: TsEntity,
  ): Promise<ComplexTypeOutput> {
    const entityPascal = entityDefinition.namePascal

    const fields = entityDefinition.fields.filter(field => field.kind === 'rawField') as TsRawFieldDefinition[]
    const relationships = entityDefinition.fields.filter(field => field.kind === 'relationship') as TsRelationshipFieldDefinition[]
    const enums = entityDefinition.fields.filter(field => field.kind === 'enum') as TsEnumDefinition[]

    /**
     * Imports
     */
    let template = ''

    const relationshipImports = renderRelationshipImports(relationships, entityDefinition, { interfaceImportDir: options.interfaceImportDir ?? './' })
    const enumImports = renderEnumImports(enums, { enumImportDir: options.enumsDir })

    template += relationshipImports ? (relationshipImports + '\n\n') : ''
    template += enumImports ? (enumImports + '\n\n') : ''

    template += `export interface ${entityPascal} {`

    /**
     * Fields
     */
    const renderedFieldTypes = renderFieldTypes(fields, indent)
    if (renderedFieldTypes) {
      template += '\n'
      template += `${indent}// fields\n`
      template += renderedFieldTypes
    }

    /**
     * Enum Fields
     */
    const enumFieldTypes = renderEnumFieldTypes(enums, indent)
    if (enumFieldTypes) {
      template += '\n'
      template += renderEnumFieldTypes(enums, indent)
    }

    /**
     * Relationship Fields
     */
    const relationshipTypes = renderRelationshipsTypes(relationships, indent)
    if (relationshipTypes) {
      template += '\n\n'

      template += `${indent}// relationships\n`
      template += renderRelationshipsTypes(relationships, indent)
    }

    template += '\n}\n'

    return {
      definition: entityDefinition,
      typeName: entityDefinition.entity,
      file: template,
    }
  }
}
