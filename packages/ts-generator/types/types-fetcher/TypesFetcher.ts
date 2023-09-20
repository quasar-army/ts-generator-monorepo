import { TsEntity } from './TsEntity.js'

export interface TypesFetcher {
  fetch: (entities?: string[]) => Promise<TsEntity[]>
}
