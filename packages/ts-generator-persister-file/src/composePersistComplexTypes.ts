import { ComplexTypeOutput, PersistResponse } from '@quasar-army/ts-generator'
import { composePersistComplexType } from './composePersistComplexType.js'

export function composePersistComplexTypes (options: {
  complexTypesDir: string | ((output: ComplexTypeOutput) => string)
}) {
  return async function persistComplexTypes (
    outputs: ComplexTypeOutput[],
  ): Promise<PersistResponse[]> {
    const promises: Promise<PersistResponse>[] = []

    console.log('persisting ' + outputs.length + ' files')

    for (const output of outputs) {
      const persistComplexType = composePersistComplexType(options)
      promises.push(persistComplexType(output))
    }

    const result = await Promise.all(promises)

    return result
  }
}
