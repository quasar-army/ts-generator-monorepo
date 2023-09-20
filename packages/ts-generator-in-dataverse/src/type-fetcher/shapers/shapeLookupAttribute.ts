import { TsRelationshipFieldDefinition } from '@quasar-army/ts-generator'
import { DataverseAttribute } from '../../types/Dataverse.js'
import { fetchEntitiesSchemaName } from '../fetchEntitiesSchemaName.js'

export async function shapeLookupAttribute (
  attribute: DataverseAttribute,
): Promise<TsRelationshipFieldDefinition | false> {
  const fieldName = attribute.IsCustomAttribute
    ? attribute.SchemaName
    : attribute.LogicalName

  if (attribute.Targets.length !== 1) {
    return false
  }

  const schemaName = await fetchEntitiesSchemaName(attribute.Targets[0])

  return {
    kind: 'relationship',
    relationshipType: 'belongsTo',
    fieldName,
    relatedEntityPascal: schemaName,
    nullable: true,
    foreignKey: attribute.Targets[0] + 'id',
  }
}
