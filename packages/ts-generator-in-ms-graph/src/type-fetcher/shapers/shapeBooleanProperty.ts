import { TsFieldDefinition } from '@quasar-army/ts-generator'
import { GraphProperty } from '../../types/MsGraph.js'

export function shapeBooleanProperty (
  property: GraphProperty,
): TsFieldDefinition | false {
  return {
    kind: 'rawField',
    fieldName: property._attributes.Name,
    nullable: true,
    types: ['boolean'],
  }
}
