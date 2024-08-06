import { TsRawFieldDefinition } from '@quasar-army/ts-generator'

export function renderFieldTypes (
  fields: TsRawFieldDefinition[],
  indent: string,
) {
  const result = []

  fields.forEach(field => {
    let snippet = ''
    snippet += indent
    snippet += field.fieldName
    snippet += ': '

    const types = field.types
    if (field.nullable) types.push('null')
    snippet += types.join(' | ')

    result.push(snippet)
  })

  return result.join('\n')
}
