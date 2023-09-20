import { EntityOutput, TsEntity } from '@quasar-army/ts-generator'
import { composeMakeEntityType } from './composeMakeEntityType.js'

export function composeMakeEntityTypes (options: {
  enumsDir?: string
  interfaceImportDir?: string
}) {
  return async function makeEntityTypes (
    entityDefinitions: TsEntity[],
  ): Promise<EntityOutput[]> {
    const makeEntityType = composeMakeEntityType(options)

    const entityTypePromises = entityDefinitions.map(definition => {
      return makeEntityType(definition)
    })

    const entityTypeOutputs: EntityOutput[] = await Promise.all(entityTypePromises)

    return entityTypeOutputs
  }
}
