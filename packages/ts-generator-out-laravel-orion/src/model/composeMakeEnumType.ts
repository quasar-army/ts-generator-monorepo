import { EnumOutput, TsEnum } from '@quasar-army/ts-generator'
import { renderEnumOptions } from './enum-renderers/renderEnumOptions.js'

const indent = '  '

// composeMakeEnumType

export function composeMakeEnumType () {
  return async function makeEnumType (
    enumDefinition: TsEnum,
  ): Promise<EnumOutput> {
    const enumNamePascal = enumDefinition.namePascal

    let template = `export enum ${enumNamePascal} {\n`

    template += renderEnumOptions(enumDefinition.options, indent + indent)

    template += '\n}\n'

    return {
      definition: enumDefinition,
      enumName: enumDefinition.name,
      file: template,
    }
  }
}
