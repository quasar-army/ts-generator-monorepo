export interface TsEnumOption {
  name: string
  uniqueIdentifier: string | number
}

export interface TsEnum {
  name: string
  namePascal: string
  options: TsEnumOption[]
}
