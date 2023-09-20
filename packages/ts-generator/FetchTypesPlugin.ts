import { TsEnum } from './types/enums-fetcher/TsEnum.js'
import { TsEntity } from './types/types-fetcher/TsEntity.js'

export interface FetchTypesPlugin {
  fetchType: (entity: string) => Promise<TsEntity>
  fetchAllTypes?: () => Promise<TsEntity[]>
  fetchEnum: (entity: string) => Promise<TsEnum>
  fetchAllEnums?: () => Promise<TsEnum[]>
}
