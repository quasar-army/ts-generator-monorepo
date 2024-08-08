import { TsEnum } from '@quasar-army/ts-generator'

export function renderEnumOptions (
  options: TsEnum['options'],
  indent: string,
) {
  const result = []

  options.forEach(option => {
    const uniqueIdentifier = typeof option.uniqueIdentifier === 'string'
      ? `'${option.uniqueIdentifier}'` : option.uniqueIdentifier

    let snippet = ''
    snippet += indent
    snippet += `'${option.name}' = ${uniqueIdentifier}`

    result.push(snippet)
  })

  return result.join(',' + '\n')
}
