import { TsComplexFieldDefinition } from '@quasar-army/ts-generator'
import { uniqBy } from 'lodash-es'

export function renderComplexTypeImports (
  complexTypes: TsComplexFieldDefinition[],
  options: { interfaceImportDir: string },
) {
  const result = []

  const uniqComplexTypes = uniqBy(complexTypes, complexType => complexType.type)

  uniqComplexTypes.forEach(field => {
    const complexTypePascal = field.type
    result.push(`import { ${complexTypePascal} as Complex${complexTypePascal} } from '${options.interfaceImportDir}${complexTypePascal}'`)
  })

  return result.join('\n')
}
