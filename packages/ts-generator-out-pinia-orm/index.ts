import { TsGeneratorOutPlugin } from '@quasar-army/ts-generator'
import { composeMakeEntityType } from './src/composeMakeEntityType.js'
import { composeMakeEntityTypes } from './src/composeMakeEntityTypes.js'
import { composeMakeEnumType } from './src/composeMakeEnumType.js'
import { composeMakeEnumTypes } from './src/composeMakeEnumTypes.js'
import { composeMakeComplexType } from './src/composeMakeComplexType.js'
import { composeMakeComplexTypes } from './src/composeMakeComplexTypes.js'

export function MakeOutPiniaOrm (options: {
  modelsDir?: string
  enumsDir?: string
  complexTypesDir?: string
  idFieldDecorator?: string
}): TsGeneratorOutPlugin {
  return {
    makeEntityType: composeMakeEntityType({
      enumsDir: options.enumsDir,
      interfaceImportDir: options.complexTypesDir,
      idFieldDecorator: options.idFieldDecorator
    }),
    makeEntityTypes: composeMakeEntityTypes({
      enumsDir: options.enumsDir,
      interfaceImportDir: options.complexTypesDir,
      idFieldDecorator: options.idFieldDecorator
    }),
    makeEnumType: composeMakeEnumType(),
    makeEnumTypes: composeMakeEnumTypes(),
    makeComplexType: composeMakeComplexType({
      enumsDir: options.enumsDir,
      interfaceImportDir: options.complexTypesDir,
    }),
    makeComplexTypes: composeMakeComplexTypes({ enumsDir: options.enumsDir }),
  }
}
