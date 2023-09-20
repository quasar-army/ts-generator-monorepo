import { TsRawFieldDefinition } from '@quasar-army/ts-generator'

function isValidPropertyName (propertyName: string) {
  return /^[$A-Z_][0-9A-Z_$]*$/i.test(propertyName)
}

export function renderFieldTypes (
  fields: TsRawFieldDefinition[],
  indent: string,
) {
  const result = []

  fields.forEach(field => {
    const fieldName = isValidPropertyName(field.fieldName)
      ? field.fieldName
      : `'${field.fieldName}'`

    let snippet = ''
    snippet += indent
    snippet += '@Attr() declare '
    snippet += fieldName
    snippet += ': '

    const types = field.types
    if (field.nullable) types.push('null')
    snippet += types.join(' | ')

    result.push(snippet)
  })

  return result.join('\n')
}
