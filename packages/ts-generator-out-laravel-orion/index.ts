import { TsGeneratorOutPlugin } from '@quasar-army/ts-generator'
import { noOp } from './src/noOp.js'
import { composeMakeMigration } from './src/migration/composeMakeMigration.js'
import { composeMakeMigrations } from './src/migration/composeMakeMigrations.js'

export function MakeOutMigration (options: {
  modelsDir?: string
  enumsDir?: string
  complexTypesDir?: string
  idFieldDecorator?: string
}): TsGeneratorOutPlugin {
  return {
    makeEntityType: composeMakeMigration({
      enumsDir: options.enumsDir,
      interfaceImportDir: options.complexTypesDir,
      idFieldDecorator: options.idFieldDecorator
    }),
    makeEntityTypes: composeMakeMigrations({
      enumsDir: options.enumsDir,
      interfaceImportDir: options.complexTypesDir,
      idFieldDecorator: options.idFieldDecorator
    }),
    makeEnumType: noOp,
    makeEnumTypes: noOp,
    makeComplexType: noOp,
    makeComplexTypes: noOp,
  }
}

export function MakeOutModel (options: {
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

export function MakeOutPolicy (options: {
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

export function MakeOutRequest (options: {
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

export function MakeOutResource (options: {
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