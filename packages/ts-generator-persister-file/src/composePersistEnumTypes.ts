import { EnumOutput, PersistResponse } from '@quasar-army/ts-generator'
import { composePersistEnumType } from './composePersistEnumType.js'

export function composePersistEnumTypes (options: {
  enumsDir: string
}) {
  return async function persistEnumTypes (
    outputs: EnumOutput[],
  ): Promise<PersistResponse[]> {
    const promises: Promise<PersistResponse>[] = []

    for (const output of outputs) {
      const persistEnumType = composePersistEnumType(options)
      promises.push(persistEnumType(output))
    }

    const result = await Promise.all(promises)

    return result
  }
}
