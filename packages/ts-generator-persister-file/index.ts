import { ComplexTypeOutput, EnumOutput, TsGeneratorPersistPlugin, EntityOutput } from '@quasar-army/ts-generator'
import { composePersistEntityType } from './src/composePersistEntityType.js'
import { composePersistEntityTypes } from './src/composePersistEntityTypes.js'
import { composePersistEnumType } from './src/composePersistEnumType.js'
import { composePersistEnumTypes } from './src/composePersistEnumTypes.js'
import { composePersistComplexType } from './src/composePersistComplexType.js'
import { composePersistComplexTypes } from './src/composePersistComplexTypes.js'

export function MakeFilePersister (options: {
  modelsDir: string | ((output: EntityOutput) => string)
  enumsDir: string | ((output: EnumOutput) => string)
  complexTypesDir: string | ((output: ComplexTypeOutput) => string)
}): TsGeneratorPersistPlugin {
  return {
    persistEntityType: composePersistEntityType({ modelsDir: options.modelsDir }),
    persistEntityTypes: composePersistEntityTypes({ modelsDir: options.modelsDir }),
    persistEnumType: composePersistEnumType({ enumsDir: options.enumsDir }),
    persistEnumTypes: composePersistEnumTypes({ enumsDir: options.enumsDir }),
    persistComplexType: composePersistComplexType({ complexTypesDir: options.complexTypesDir }),
    persistComplexTypes: composePersistComplexTypes({ complexTypesDir: options.complexTypesDir }),
  }
}
