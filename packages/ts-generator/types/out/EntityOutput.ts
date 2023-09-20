import { TsEntity } from '../types-fetcher/TsEntity.js'

export interface EntityOutput {
  entityName: string
  definition: TsEntity
  file: string
}
