export type GraphRawAttributeType = 'Edm.Boolean' |
  'Edm.Int32' |
  'Edm.DateTimeOffset' |
  'Edm.String' |
  'Edm.Binary' |
  'Edm.Byte' |
  'Edm.Date' |
  'Edm.Decimal' |
  'Edm.Double' |
  'Edm.Duration' |
  'Edm.Guid' |
  'Edm.Int16' |
  'Edm.Int64' |
  'Edm.Single' |
  'Edm.Stream' |
  'Edm.TimeOfDay'

export type GraphRawAttributeTypeArray = 'Collection(Edm.Boolean)' |
  'Collection(Edm.Int32)' |
  'Collection(Edm.DateTimeOffset)' |
  'Collection(Edm.String)' |
  'Collection(Edm.Binary)' |
  'Collection(Edm.Byte)' |
  'Collection(Edm.Date)' |
  'Collection(Edm.Decimal)' |
  'Collection(Edm.Double)' |
  'Collection(Edm.Duration)' |
  'Collection(Edm.Guid)' |
  'Collection(Edm.Int16)' |
  'Collection(Edm.Int64)' |
  'Collection(Edm.Single)' |
  'Collection(Edm.Stream)' |
  'Collection(Edm.TimeOfDay)'

export type GraphRelationshipType = 'hasMany' |
  'belongsTo'

export type AttributeType = GraphRawAttributeType | GraphRelationshipType

export interface GraphProperty {
  _attributes: {
    Name: string
    Type: AttributeType | string
  }
}

export interface GraphNavigationProperty {
  _attributes: {
    Name: string
    Type: string
    ContainsTarget?: 'true' | 'false'
  }
}

export interface GraphDefinition {
  _attributes: {
    'Name': string,
    'BaseType': string,
    'OpenType': 'true' | 'false'
    Abstract: 'true' | 'false'
  }
  Property?: GraphProperty[] | GraphProperty
  NavigationProperty?: GraphNavigationProperty[]
  isComplex: boolean
}

export interface GraphOptionSetOption {
  Value: number
  Label: {
    LocalizedLabels: {
      Label: string,
      MetadataId: '878d70a3-ee33-47b1-a45b-e4c1299c5784',
    }[]
  }
}

export interface EnumMember {
  _attributes: {
    Name: string
    Value: string
  }
}

export interface GraphEnumDefinition {
  _attributes: {
    Name: string
  }
  Member: EnumMember[]
}
