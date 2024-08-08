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

export function composeMakePolicy () {
  return async function makePolicy (
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

namespace App\\Policies;

use App\\${entityDefinition.namePascal};
use App\\User;
use Bouncer;
use Illuminate\\Auth\\Access\\HandlesAuthorization;

class ${entityDefinition.namePascal}Policy
{
    use HandlesAuthorization;

    public function before(User $user, $ability)
    {
        if ($user->isAdmin()) {
            return true;
        }
    }

    public function viewAny(User $user)
    {
        return true;
    }

    public function view(User $user, ${entityDefinition.namePascal} $model)
    {
        return true;
    }

    public function create(User $user)
    {
        return $user->canAccessFarm(request()->header('X-Farm-Id'));
    }

    public function update(User $user, ${entityDefinition.namePascal} $model)
    {
        $farm = $model->farm;

        return Bouncer::can('manage', $farm)
            || $user->isFarmsPrimaryManager($farm)
            || $user->canManageBusiness($farm->businesses)
            || $user->can('view', $farm);
    }

    public function delete(User $user, ${entityDefinition.namePascal} $model)
    {
        $farm = $model->farm;

        return Bouncer::can('manage', $farm)
            || $user->isFarmsPrimaryManager($farm)
            || $user->canManageBusiness($farm->businesses)
            || $user->can('view', $farm);
    }

    public function restore(User $user, ${entityDefinition.namePascal} $model)
    {
        //
    }

    public function forceDelete(User $user, ${entityDefinition.namePascal} $model)
    {
        //
    }
}
    `

    return {
      definition: entityDefinition,
      entityName: `policy.${entityDefinition.entity}`,
      file: template,
    }
  }
}
