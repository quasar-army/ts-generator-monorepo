import { EnumOutput, TsEnum } from '@quasar-army/ts-generator'
import { composeMakeEnumType } from './composeMakeEnumType.js'

export function composeMakeEnumTypes () {
  return async function makeEnumTypes (
    enumDefinitions: TsEnum[],
  ): Promise<EnumOutput[]> {
    const makeEnumType = composeMakeEnumType()

    const enumTypePromises = enumDefinitions.map(definition => {
      return makeEnumType(definition)
    })

    const enumTypeOutputs: EnumOutput[] = await Promise.all(enumTypePromises)

    return enumTypeOutputs
  }
}
