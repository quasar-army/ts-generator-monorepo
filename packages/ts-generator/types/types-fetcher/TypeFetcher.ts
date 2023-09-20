import { TsEntity } from './TsEntity.js'

export interface TypeFetcher {
  fetch: (entity: string) => Promise<TsEntity>
}
