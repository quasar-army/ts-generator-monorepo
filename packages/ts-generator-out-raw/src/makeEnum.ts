import { TsEnum } from '@quasar-army/ts-generator'
import { renderEnumOptions } from './enum-renderers/renderEnumOptions.js'

const indent = '  '

export const makeEnum = (enumDefinition: TsEnum) => {
  const enumNamePascal = enumDefinition.namePascal

  let template = `enum ${enumNamePascal} {\n`

  template += renderEnumOptions(enumDefinition.options, indent + indent)

  template += '\n}\n'

  return template
}
