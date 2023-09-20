import { TsEnum, TsEnumOption } from '@quasar-army/ts-generator'
import { GraphEnumDefinition } from '../types/MsGraph.js'
import { toNumber } from 'lodash-es'
import { pascalCase } from 'change-case'

export async function shapeEnum (
  enumDefinition: GraphEnumDefinition,
): Promise<TsEnum> {
  const options: TsEnumOption[] = enumDefinition.Member.map(member => {
    return {
      uniqueIdentifier: toNumber(member._attributes.Value),
      name: member._attributes.Name,
    }
  })

  return {
    name: enumDefinition._attributes.Name,
    namePascal: pascalCase(enumDefinition._attributes.Name),
    options,
  }
}
