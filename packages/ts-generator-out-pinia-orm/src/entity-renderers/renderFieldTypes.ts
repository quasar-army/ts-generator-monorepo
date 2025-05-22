import { TsEntity, TsRawFieldDefinition } from '@quasar-army/ts-generator'

function isValidPropertyName (propertyName: string) {
  return /^[$A-Z_][0-9A-Z_$]*$/i.test(propertyName)
}

export function renderFieldTypes (
  fields: TsRawFieldDefinition[],
  indent: string,
  entityDefinition: TsEntity,
  options?: { idFieldDecorator?: string }
) {
  const result = []

  fields.forEach(field => {
    const fieldName = isValidPropertyName(field.fieldName)
      ? field.fieldName
      : `'${field.fieldName}'`
    
    const isId = fieldName === entityDefinition.primaryKey
    const decorator = isId ? (options.idFieldDecorator ?? 'Uid') : 'Attr'

    let snippet = ''
    snippet += indent
    snippet += `@${decorator}() declare `
    snippet += fieldName
    snippet += ': '

    const types = field.types
    if (field.nullable && !isId) types.push('null')
    snippet += types.join(' | ')

    result.push(snippet)
  })

  return result.join('\n')
}
