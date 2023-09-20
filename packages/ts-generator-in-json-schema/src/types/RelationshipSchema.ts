export interface BaseRelationshipSchema {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any
  label: string
  description?: string
  component?: string
}

export interface HasManySchema extends BaseRelationshipSchema {
  type: 'array'
  relationship: 'has_many',
  items: {
    $ref: string
  }
  foreign_key: string
}

export interface HasOneSchema extends BaseRelationshipSchema {
  relationship: 'has_one',
  foreign_key: string
  $ref: string
}

export interface BelongsToSchema extends BaseRelationshipSchema {
  relationship: 'belongs_to',
  foreign_key: string
  $ref: string
}

export type RelationshipSchema =
  HasManySchema |
  HasOneSchema |
  BelongsToSchema
