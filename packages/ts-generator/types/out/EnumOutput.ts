import { TsEnum } from '../enums-fetcher/TsEnum.js'

export interface EnumOutput {
  enumName: string
  definition: TsEnum
  file: string
}
