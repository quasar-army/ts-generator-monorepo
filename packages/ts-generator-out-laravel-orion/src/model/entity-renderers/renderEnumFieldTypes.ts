import { TsEnumDefinition } from '@quasar-army/ts-generator'
import { uniqBy } from 'lodash-es'

export function renderEnumFieldTypes (
  enumDefinitions: TsEnumDefinition[],
  indent: string,
) {
  const result = []

  const enumDefinitionsUniq = uniqBy(enumDefinitions, enumDefinition => enumDefinition.enumName)

  enumDefinitionsUniq.forEach(field => {
    let snippet = ''
    snippet += indent
    snippet += '@Attr() declare '
    snippet += field.fieldName
    snippet += ': '

    const types = [field.enumNamePascal]
    if (field.nullable) types.push('null')
    snippet += types.join(' | ')

    result.push(snippet)
  })

  return result.join('\n')
}
