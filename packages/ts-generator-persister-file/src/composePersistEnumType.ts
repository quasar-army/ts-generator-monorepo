import { EnumOutput, PersistResponse } from '@quasar-army/ts-generator'
import { writeFileRecursive } from './utils/saveStringToFile.js'

export function composePersistEnumType (options: {
  enumsDir: string | ((output: EnumOutput) => string)
}) {
  return async function persistEnumType (
    output: EnumOutput,
  ): Promise<PersistResponse> {
    const fileName = typeof options.enumsDir === 'function' ?
      options.enumsDir(output) :
      options.enumsDir + '/' + output.definition.namePascal + '.ts'

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
