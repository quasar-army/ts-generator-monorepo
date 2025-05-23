import { TsFieldDefinition } from './TsFieldDefinition.js'

export interface TsEntity {
  entity: string
  namePascal: string
  primaryKey: string | string[]
  fields: TsFieldDefinition[]
}
