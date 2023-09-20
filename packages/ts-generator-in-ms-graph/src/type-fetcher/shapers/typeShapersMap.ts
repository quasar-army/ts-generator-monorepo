import { TsFieldDefinition } from '@quasar-army/ts-generator'
import { shapeStringProperty } from './shapeStringProperty.js'
import { shapeNumberProperty } from './shapeNumberProperty.js'
import { GraphDefinition, GraphProperty, GraphRawAttributeType, GraphRawAttributeTypeArray, GraphRelationshipType } from '../../types/MsGraph.js'
import { shapeBooleanProperty } from './shapeBooleanProperty.js'
import { shapeBooleanArrayProperty } from './shapeBooleanArrayProperty.js'
import { shapeStringArrayProperty } from './shapeStringArrayProperty.js'
import { shapeNumberArrayProperty } from './shapeNumberArrayProperty.js'

export type GetPropertyTypeFunction = (
  property: GraphProperty,
  definition: GraphDefinition
) => Promise<TsFieldDefinition | false> | TsFieldDefinition | false

export const typeShapersMap: Partial<Record<
  GraphRawAttributeType | GraphRelationshipType | GraphRawAttributeTypeArray,
  GetPropertyTypeFunction
>> = {
  // Singular
  'Edm.Boolean': shapeBooleanProperty,
  'Edm.DateTimeOffset': shapeStringProperty,
  'Edm.Int32': shapeNumberProperty,
  'Edm.String': shapeStringProperty,
  'Edm.Binary': shapeStringProperty,
  'Edm.Byte': shapeNumberProperty,
  'Edm.Date': shapeStringProperty,
  'Edm.Decimal': shapeNumberProperty,
  'Edm.Double': shapeNumberProperty,
  'Edm.Duration': shapeStringProperty,
  'Edm.Guid': shapeStringProperty,
  'Edm.Int16': shapeNumberProperty,
  'Edm.Int64': shapeNumberProperty,
  'Edm.Single': shapeNumberProperty,
  'Edm.Stream': shapeStringProperty,
  'Edm.TimeOfDay': shapeStringProperty,

  // Collections (arrays)
  'Collection(Edm.Boolean)': shapeBooleanArrayProperty,
  'Collection(Edm.DateTimeOffset)': shapeStringArrayProperty,
  'Collection(Edm.Int32)': shapeNumberArrayProperty,
  'Collection(Edm.String)': shapeStringArrayProperty,
  'Collection(Edm.Binary)': shapeStringArrayProperty,
  'Collection(Edm.Byte)': shapeNumberArrayProperty,
  'Collection(Edm.Date)': shapeStringArrayProperty,
  'Collection(Edm.Decimal)': shapeNumberArrayProperty,
  'Collection(Edm.Double)': shapeNumberArrayProperty,
  'Collection(Edm.Duration)': shapeStringArrayProperty,
  'Collection(Edm.Guid)': shapeStringArrayProperty,
  'Collection(Edm.Int16)': shapeNumberArrayProperty,
  'Collection(Edm.Int64)': shapeNumberArrayProperty,
  'Collection(Edm.Single)': shapeNumberArrayProperty,
  'Collection(Edm.Stream)': shapeStringArrayProperty,
  'Collection(Edm.TimeOfDay)': shapeStringArrayProperty,
}
