import { TsEnum } from './TsEnum.js'

export interface EnumFetcher {
  fetch: (enumName: string) => Promise<TsEnum>
}
