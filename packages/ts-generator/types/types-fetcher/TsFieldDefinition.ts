export type RawTsType = 'null' |
  'null[]' |
  'string' |
  'string[]' |
  'array' |
  'object' |
  'object[]' |
  'boolean' |
  'boolean[]' |
  'number' |
  'number[]' |
  'relationship' |
  'complex' |
  'any'

export type FieldKind = 'rawField' |
  'relationship'

export type relationshipType = 'belongsTo' |
  'hasMany' | 'belongsToMany'

export interface TsFieldDefinitionBase {
  fieldName: string
  nullable: boolean
}

export interface TsRawFieldDefinition extends TsFieldDefinitionBase {
  kind: 'rawField'
  types: (RawTsType | string)[]
}

export interface TsComplexFieldDefinition extends TsFieldDefinitionBase {
  kind: 'complexField'
  type: string
}

export interface TsHasManyComplexFieldDefinition extends TsComplexFieldDefinition {
  isArray: true
}

export interface TsBelongsToComplexFieldDefinition extends TsComplexFieldDefinition {
  isArray: false
}

export interface TsBelongsToDefinition extends TsFieldDefinitionBase {
  kind: 'relationship'
  relationshipType: 'belongsTo'
  foreignKey: string
  relatedEntityPascal: string
  ownerKey?: string
}

export interface TsHasManyDefinition extends TsFieldDefinitionBase {
  kind: 'relationship'
  relationshipType: 'hasMany'
  relatedEntityPascal: string
  foreignKey: string
  localKey?: string
}

export interface TsHasOneDefinition extends TsFieldDefinitionBase {
  kind: 'relationship'
  relationshipType: 'hasOne'
  relatedEntityPascal: string
  foreignKey: string
  localKey?: string
}

export interface TsBelongsToManyDefinition extends TsFieldDefinitionBase {
  kind: 'relationship'
  relationshipType: 'belongsToMany'
  relatedEntityPascal: string
  foreignPivotKey: string
  parentLocalKey: string
  relatedLocalKey: string
  relatedPivotKey: string
  pivotEntityPascal: string
}

export interface TsEnumDefinition extends TsFieldDefinitionBase {
  kind: 'enum'
  enumName: string
  enumNamePascal: string
}

export type TsRelationshipFieldDefinition =
  TsBelongsToDefinition |
  TsHasManyDefinition |
  TsHasOneDefinition |
  TsBelongsToManyDefinition

export type TsFieldDefinition = TsRawFieldDefinition | TsRelationshipFieldDefinition | TsEnumDefinition | TsComplexFieldDefinition
