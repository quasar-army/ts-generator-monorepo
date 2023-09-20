import { TsEntity } from '../types-fetcher/TsEntity.js'

export interface ComplexTypeOutput {
  typeName: string
  definition: TsEntity
  file: string
}
