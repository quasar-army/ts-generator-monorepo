import { TsComplexFieldDefinition } from '@quasar-army/ts-generator'

export function renderComplexFieldTypes (
  fields: TsComplexFieldDefinition[],
  indent: string,
) {
  const result = []

  fields.forEach(field => {
    let snippet = ''
    snippet += indent
    snippet += '@Attr() declare '
    snippet += field.fieldName
    snippet += ': '

    const types = [`Complex${field.type}`]
    if (field.nullable) types.push('null')
    snippet += types.join(' | ')

    result.push(snippet)
  })

  return result.join('\n')
}
