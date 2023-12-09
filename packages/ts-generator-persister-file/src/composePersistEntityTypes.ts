import { EntityOutput, PersistResponse } from '@quasar-army/ts-generator'
import { composePersistEntityType } from './composePersistEntityType.js'

export function composePersistEntityTypes (options: {
  modelsDir: string | ((output: EntityOutput) => string)
}) {
  return async function persistEntityTypes (
    outputs: EntityOutput[],
  ): Promise<PersistResponse[]> {
    const promises: Promise<PersistResponse>[] = []

    for (const output of outputs) {
      const persistEntityType = composePersistEntityType(options)
      promises.push(persistEntityType(output))
    }

    const result = await Promise.all(promises)

    return result
  }
}
