export type DataverseRawAttributeType = 'Status' |
  'Virtual' |
  'State' |
  'BigInt' |
  'DateTime' |
  'String' |
  'EntityName' |
  'Integer' |
  'Uniqueidentifier' |
  'Lookup' |
  'Boolean' |
  'Picklist'

export type DataverseRelationshipAttributeType = 'Lookup' |
  'Uniqueidentifier' |
  'Owner'

export type AttributeType = DataverseRawAttributeType | DataverseRelationshipAttributeType

export interface DataverseAttribute {
  LogicalName: string
  AttributeType: AttributeType
  AttributeOf: string
  Targets: string[]
  SchemaName: string
  IsCustomAttribute: boolean
}

export interface DataverseDefinition {
  LogicalCollectionName: string
  LogicalName: string
  SchemaName: string
  DisplayName: {
    LocalizedLabels: {
      'Label': string,
      'LanguageCode': number,
      'IsManaged': boolean,
      'MetadataId': string,
      'HasChanged': boolean | null
    }[]
  }
  Attributes: DataverseAttribute[]
}

export interface DataverseOptionSetOption {
  Value: number
  Label: {
    LocalizedLabels: {
      Label: string,
      MetadataId: '878d70a3-ee33-47b1-a45b-e4c1299c5784',
    }[]
  }
}

export interface DataverseEnumDefinition {
  Name: string
  OptionSetType: 'Picklist' | 'Boolean'
  Options?: DataverseOptionSetOption[]
  TrueOption?: {
    Value: any
    Label: {
      LocalizedLabels: {
        Label: string,
        MetadataId: '878d70a3-ee33-47b1-a45b-e4c1299c5784',
      }[]
    }
  }
  FalseOption?: {
    Value: any
    Label: {
      LocalizedLabels: {
        Label: string,
        MetadataId: '878d70a3-ee33-47b1-a45b-e4c1299c5784',
      }[]
    }
  }
}

export interface FetchDefinitionsResponse {
  '@odata.context': string
  value: DataverseDefinition[]
}
