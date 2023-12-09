import { EntityOutput, PersistResponse } from '@quasar-army/ts-generator'
import { writeFileRecursive } from './utils/saveStringToFile.js'

export function composePersistEntityType (options: {
  modelsDir: string | ((output: EntityOutput) => string)
}) {
  return async function persistEntityType (
    output: EntityOutput,
  ): Promise<PersistResponse> {
    const fileName = typeof options.modelsDir === 'function' ?
      options.modelsDir(output) :
      options.modelsDir + '/' + output.definition.namePascal + '.ts'

    try {
      await writeFileRecursive(fileName, output.file)
      return {
        message: fileName,
        status: 'success',
      }
    } catch (error) {
      console.error(error)
      return {
        message: 'error writing file',
        status: 'error',
      }
    }
  }
}
