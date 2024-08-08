import { EntityOutput, TsComplexFieldDefinition, TsEntity, TsEnumDefinition, TsRawFieldDefinition, TsRelationshipFieldDefinition } from '@quasar-army/ts-generator'
import { renderDecoratorImports } from './entity-renderers/renderDecoratorImports.js'
import { renderFieldTypes } from './entity-renderers/renderFieldTypes.js'
import { renderRelationshipsTypes } from './entity-renderers/renderRelationshipsTypes.js'
import { renderRelationshipImports } from './entity-renderers/renderRelationshipImports.js'
import { renderEnumImports } from './entity-renderers/renderEnumImports.js'
import { renderEnumFieldTypes } from './entity-renderers/renderEnumFieldTypes.js'
import { renderComplexFieldTypes } from './entity-renderers/renderComplexFieldTypes.js'
import { renderComplexTypeImports } from './entity-renderers/renderComplexTypeImports.js'

import { pluralize, underscore } from 'inflection'

const indent = '  '

export function composeMakeResource () {
  return async function makeResource (
    entityDefinition: TsEntity,
  ): Promise<EntityOutput> {
    const entityPascal = entityDefinition.namePascal

    const fields = entityDefinition.fields.filter(field => field.kind === 'rawField') as TsRawFieldDefinition[]
    const relationships = entityDefinition.fields.filter(field => field.kind === 'relationship') as TsRelationshipFieldDefinition[]
    const enums = entityDefinition.fields.filter(field => field.kind === 'enum') as TsEnumDefinition[]
    const complexFields = entityDefinition.fields.filter(field => field.kind === 'complexField') as TsComplexFieldDefinition[]

    const renderPrimaryKey = () => {
      return `$table->identity('${entityDefinition.primaryKey}', always: true)->primary();`
    }

    const renderTimestamps = () => {
      if (entityDefinition.useTimestamps ?? true) {
        return '$table->timestamps();'
      } else {
        return ''
      }
    }

    const renderSoftDelete = () => {
      if (entityDefinition.useSoftDelete ?? false) {
        return '$table->softDeletes();'
      } else {
        return ''
      }
    }

    const fieldTypeMap = new Map(
      [
        [ 'string', 'string' ],
        [ 'integer', 'bigInteger' ],
        [ 'float', 'two' ],
        [ 'boolean', 'two' ],
      ]
    )

    const renderFields = () => {
      let fieldsString = ''

      fields.forEach(field => {
        if (field.fieldName === entityDefinition.primaryKey) {
          return
        }

        fieldsString += `$table->${fieldTypeMap.get(field.types)}('${field.fieldName}')`

        if (field.nullable) {
          fieldsString += '->nullable()'
        }

        fieldsString += ";\n"
      });

      return fieldsString
    }

    const template = `
<?php

namespace App\\Http\\Resources;

use Orion\\Http\\Resources\\Resource;

class ${entityDefinition.namePascal}Resource extends Resource
{
    public function toArray($request)
    {
        $append = [
        //
        ];

        return array_merge(parent::toArray($request), $append);
    }
}

    `

    return {
      definition: entityDefinition,
      entityName: `resource.${entityDefinition.entity}`,
      file: template,
    }
  }
}
