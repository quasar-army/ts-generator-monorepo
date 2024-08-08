import { EntityOutput, TsComplexFieldDefinition, TsEntity, TsEnumDefinition, TsRawFieldDefinition, TsRelationshipFieldDefinition } from '@quasar-army/ts-generator'
import fieldIsDate from '../helpers/fieldIsDate.js'
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

export function composeMakeController () {
  return async function makeController (
    entityDefinition: TsEntity,
  ): Promise<EntityOutput> {
    const entityPascal = entityDefinition.namePascal

    const fields = entityDefinition.fields.filter(field => field.kind === 'rawField') as TsRawFieldDefinition[]
    const relationships = entityDefinition.fields.filter(field => field.kind === 'relationship') as TsRelationshipFieldDefinition[]
    const enums = entityDefinition.fields.filter(field => field.kind === 'enum') as TsEnumDefinition[]
    const complexFields = entityDefinition.fields.filter(field => field.kind === 'complexField') as TsComplexFieldDefinition[]


    const renderIncludes = () => {
      let output = `
      public function includes(): array
      {
        return [`

      relationships.forEach(relationship => {
        output += `'${relationship.fieldName}',\n`
      })

      output += `];
    }`

      return output
    }

    const template = `
<?php

namespace App\\Http\\Controllers\\Api;

use App\\${entityPascal};

class ${pluralize(entityPascal)}Controller extends BaseController
{
    protected $model = ${entityPascal}::class;

    ${renderIncludes()}

    public function exposedScopes(): array
    {
        return [
            ...parent::exposedScopes(),
        ];
    }
}

    `

    return {
      definition: entityDefinition,
      entityName: `controller.${entityDefinition.entity}`,
      file: template,
    }
  }
}
