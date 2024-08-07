import { TsGeneratorOutPlugin } from '@quasar-army/ts-generator'
import { noOp } from './src/noOp.js'
import { composeMakeMigration } from './src/migration/composeMakeMigration.js'
import { composeMakeMigrations } from './src/migration/composeMakeMigrations.js'
import { composeMakeModel } from './src/model/composeMakeModel.js'
import { composeMakeModels } from './src/model/composeMakeModels.js'
import { composeMakePolicy } from './src/policy/composeMakePolicy.js'
import { composeMakePolicies } from './src/policy/composeMakePolicies.js'
import { composeMakeRequest } from './src/request/composeMakeRequest.js'
import { composeMakeRequests } from './src/request/composeMakeRequests.js'
import { composeMakeResource } from './src/resource/composeMakeResource.js'
import { composeMakeResources } from './src/resource/composeMakeResources.js'

export function MakeOutMigration (): TsGeneratorOutPlugin {
  return {
    makeEntityType: composeMakeMigration(),
    makeEntityTypes: composeMakeMigrations(),
    makeEnumType: noOp,
    makeEnumTypes: noOp,
    makeComplexType: noOp,
    makeComplexTypes: noOp,
  }
}

export function MakeOutModel (): TsGeneratorOutPlugin {
  return {
    makeEntityType: composeMakeModel(),
    makeEntityTypes: composeMakeModels(),
    makeEnumType: noOp,
    makeEnumTypes: noOp,
    makeComplexType: noOp,
    makeComplexTypes: noOp,
  }
}

export function MakeOutPolicy (): TsGeneratorOutPlugin {
  return {
    makeEntityType: composeMakePolicy(),
    makeEntityTypes: composeMakePolicies(),
    makeEnumType: noOp,
    makeEnumTypes: noOp,
    makeComplexType: noOp,
    makeComplexTypes: noOp,
  }
}

export function MakeOutRequest (): TsGeneratorOutPlugin {
  return {
    makeEntityType: composeMakeRequest(),
    makeEntityTypes: composeMakeRequests(),
    makeEnumType: noOp,
    makeEnumTypes: noOp,
    makeComplexType: noOp,
    makeComplexTypes: noOp,
  }
}

export function MakeOutResource (): TsGeneratorOutPlugin {
  return {
    makeEntityType: composeMakeResource(),
    makeEntityTypes: composeMakeResources(),
    makeEnumType: noOp,
    makeEnumTypes: noOp,
    makeComplexType: noOp,
    makeComplexTypes: noOp,
  }
}