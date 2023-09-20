import { TsEnum } from './TsEnum.js'

export interface EnumsFetcher {
  fetch: (enumNames?: string[]) => Promise<TsEnum[]>
}
