import { ComplexTypeOutput, PersistResponse } from '@quasar-army/ts-generator'
import { writeFileRecursive } from './utils/saveStringToFile.js'

export function composePersistComplexType (options: {
  complexTypesDir: string
}) {
  return async function persistComplexType (
    output: ComplexTypeOutput,
  ): Promise<PersistResponse> {
    const fileName = options.complexTypesDir +
      '/' +
      output.definition.namePascal +
      '.ts'

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
