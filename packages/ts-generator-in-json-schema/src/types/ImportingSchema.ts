import { FieldSchema } from './FieldSchema.js'
import { RelationshipSchema } from './RelationshipSchema.js'

export interface ImportingSchema {
  '$id': string
  'title': string
  'entity': string
  'type': string
  'composite_keys'?: string[]
  properties: Record<string, FieldSchema | RelationshipSchema>
}
