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

import fieldIsDate from '../helpers/fieldIsDate.js'

const indent = '  '

export function composeMakeMigration () {
  return async function makeMigration (
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
        [ 'boolean', 'boolean' ],
      ]
    )

    const numberTypeMap = new Map(
      [
        [ 'integer', 'bigInteger' ],
        [ 'float', 'float' ],
      ]
    )

    const timestampFields = [
      'created_at',
      'updated_at',
      'deleted_at'
    ]

    const renderFields = () => {
      let output = ''

      fields.forEach(field => {
        if (field.fieldName === entityDefinition.primaryKey) {
          return
        }

        if (timestampFields.includes(field.fieldName)) {
          return
        }

        if (relationships.find(f => f.relationshipType === 'belongsTo' && f.foreignKey === field.fieldName)) {
          return
        }

        const fieldType = field.types.find(fieldType => fieldType !== 'null') ?? 'string'

        if (fieldType === 'number') {
          output += `$table->${numberTypeMap.get(field.numberType)}('${field.fieldName}')`
        } else {
          if (fieldIsDate(field)) {
            output += `$table->dateTimeTz('${field.fieldName}')`
          } else {
          output += `$table->${fieldTypeMap.get(fieldType)}('${field.fieldName}')`
          }
        }
        

        if (field.nullable) {
          output += '->nullable()'
        }

        output += ";\n"
      });

      return output
    }

    const renderRelations = () => {
      let output = ''

      relationships.filter(f => f.relationshipType === 'belongsTo').forEach(relationship => {
        output += `$table->foreignId('${relationship.foreignKey}')`
        if (relationship.nullable) {
          output += `->nullable()`
        }
        output += `->constrained();\n`
      })

      return output
    }

    const template = `
<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('${pluralize(entityDefinition.entity)}', function (Blueprint $table) {
            ${renderPrimaryKey()}
            ${renderTimestamps()}
            ${renderSoftDelete()}
            ${renderFields()}
            ${renderRelations()}
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('${pluralize(entityDefinition.entity)}');
    }
};
    `

    return {
      definition: entityDefinition,
      entityName: `migration.${entityDefinition.entity}`,
      file: template,
    }
  }
}
