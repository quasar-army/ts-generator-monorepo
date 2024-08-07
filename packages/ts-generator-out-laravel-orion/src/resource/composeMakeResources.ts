import { EntityOutput, TsEntity } from '@quasar-army/ts-generator'
import { composeMakeResource } from './composeMakeResource.js'

export function composeMakeResources () {
  return async function makeResources (
    entityDefinitions: TsEntity[],
  ): Promise<EntityOutput[]> {
    const make = composeMakeResource()

    const promises = entityDefinitions.map(definition => {
      return make(definition)
    })

    const outputs: EntityOutput[] = await Promise.all(promises)

    return outputs
  }
}
