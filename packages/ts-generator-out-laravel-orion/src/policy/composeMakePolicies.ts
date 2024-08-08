import { EntityOutput, TsEntity } from '@quasar-army/ts-generator'
import { composeMakePolicy } from './composeMakePolicy.js'

export function composeMakePolicies () {
  return async function makePolicies (
    entityDefinitions: TsEntity[],
  ): Promise<EntityOutput[]> {
    const make = composeMakePolicy()

    const promises = entityDefinitions.map(definition => {
      return make(definition)
    })

    const outputs: EntityOutput[] = await Promise.all(promises)

    return outputs
  }
}
