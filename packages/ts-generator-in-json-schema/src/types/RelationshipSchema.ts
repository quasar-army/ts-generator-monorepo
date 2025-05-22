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

export interface BelongsToManySchema extends BaseRelationshipSchema {
  relationship: 'belongs_to_many'
  entity: string
  type: 'array'
  items: {
    $ref: string
  }
  foreign_pivot_key: string
  parent_local_key: string
  related_local_key: string
  related_pivot_key: string
  pivot_entity: string
}

export type RelationshipSchema =
  HasManySchema |
  HasOneSchema |
  BelongsToSchema |
  BelongsToManySchema
