import { TsEnumDefinition } from '@quasar-army/ts-generator'
import { uniqBy } from 'lodash-es'

export function renderEnumImports (
  enumDefinitions: TsEnumDefinition[],
  options: { enumImportDir: string },
) {
  const result = []

  const uniqFields = uniqBy(enumDefinitions, enumDefinition => enumDefinition.enumName)

  uniqFields.forEach(field => {
    const enumPascal = field.enumNamePascal
    result.push(`import { ${enumPascal} } from '${options.enumImportDir}${enumPascal}'`)
  })

  return result.join('\n')
}
