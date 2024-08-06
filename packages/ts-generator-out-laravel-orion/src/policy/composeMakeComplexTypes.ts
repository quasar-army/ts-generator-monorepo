import { ComplexTypeOutput, TsEntity } from '@quasar-army/ts-generator'
import { composeMakeComplexType } from './composeMakeComplexType.js'

export function composeMakeComplexTypes (options: {
  enumsDir?: string
}) {
  return async function makeComplexTypes (
    entityDefinitions: TsEntity[],
  ): Promise<ComplexTypeOutput[]> {
    const makeComplexType = composeMakeComplexType(options)

    const entityTypePromises = entityDefinitions.map(definition => {
      return makeComplexType(definition)
    })

    const entityTypeOutputs: ComplexTypeOutput[] = await Promise.all(entityTypePromises)

    return entityTypeOutputs
  }
}
