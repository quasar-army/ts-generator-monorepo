import { TsEnumDefinition } from '@quasar-army/ts-generator'

export function renderEnumFieldTypes (
  fields: TsEnumDefinition[],
  indent: string,
) {
  const result = []

  fields.forEach(field => {
    let snippet = ''
    snippet += indent
    snippet += field.fieldName
    snippet += ': '

    const types = [field.enumNamePascal]
    if (field.nullable) types.push('null')
    snippet += types.join(' | ')

    result.push(snippet)
  })

  return result.join('\n')
}
