import { TsEnum } from './types/enums-fetcher/TsEnum.js'
import { EntityOutput } from './types/out/EntityOutput.js'
import { EnumOutput } from './types/out/EnumOutput.js'
import { TsEntity } from './types/types-fetcher/TsEntity.js'

export interface MakeTypesPlugin {
  makeEntity: (entityDescription: TsEntity) => EntityOutput
  makeEnum: (enumDescription: TsEnum) => EnumOutput
}
