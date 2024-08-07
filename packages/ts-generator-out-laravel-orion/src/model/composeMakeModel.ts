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

export function composeMakeModel () {
  return async function makeModel (
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
        return 'use Illuminate\\Database\\Eloquent\\SoftDeletes;'
      } else {
        return ''
      }
    }

    const renderFillable = () => {
      let output = 'protected $fillable = [\n'

      fields.forEach(field => {
        if (field.fieldName === entityDefinition.primaryKey) {
          return
        }

        output += `'${field.fieldName}',\n`
      });

      output += '];'

      return output
    }

    const renderDates = () => {
      let output = 'protected $dateCasts = [\n'

      fields.forEach(field => {
        if (
          field.fieldName === 'date' ||
          field.fieldName === 'datetime' ||
          field.fieldName.includes('_date')
        ) {
          output += `'${field.fieldName}' => 'datetime',\n`
        }
      });

      output += '];'

      return output
    }

    const renderCasts = () => {
      let output = 'protected $casts = [\n'

      output += '...$dateCasts,\n' 

      // fields.forEach(field => {
      //   if (field.fieldName === entityDefinition.primaryKey) {
      //     return
      //   }

      //   output += `'${field.fieldName}',\n`
      // });

      output += '];'

      return output
    }

    const relationshipTypeMap = new Map(
      [
        [ 'hasMany', 'hasMany' ],
        [ 'belongsTo', 'belongsTo' ],
        [ 'hasOne', 'hasOne' ],
      ]
    )

    const renderRelationships = () => {
      let output = ''

      relationships.forEach(relationship => {
        output += 
        `public function ${relationship.fieldName}()
        {
          return $this->${relationshipTypeMap.get(relationship.relationshipType)}(\\App\\${relationship.relatedEntityPascal}::class);
        }
        `
      })

      return output
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
      let output = ''

      fields.forEach(field => {
        if (field.fieldName === entityDefinition.primaryKey) {
          return
        }

        output += `$table->${fieldTypeMap.get(field.types)}('${field.fieldName}')`

        if (field.nullable) {
          output += '->nullable()'
        }

        output += ";\n"
      });

      return output
    }

    const template = `
<?php

namespace App;

use Illuminate\\Database\\Eloquent\\Model;
use App\\Scopes\\UserFarmsScope;
use Illuminate\\Database\\Eloquent\\Builder;

class ${entityPascal} extends Model
{
    use \\App\\Traits\\CommonScopesTrait;
    ${renderSoftDelete()}

    ${renderFillable()}

    ${renderDates()}

    ${renderCasts()}

    protected static function booted()
    {
        static::addGlobalScope(new UserFarmsScope);
    }

    ${renderRelationships()}
}

    `

    return {
      definition: entityDefinition,
      entityName: `model.${entityDefinition.entity}`,
      file: template,
    }
  }
}
