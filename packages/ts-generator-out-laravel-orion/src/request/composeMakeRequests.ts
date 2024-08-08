import { EntityOutput, TsEntity } from '@quasar-army/ts-generator'
import { composeMakeRequest } from './composeMakeRequest.js'

export function composeMakeRequests () {
  return async function makeRequests (
    entityDefinitions: TsEntity[],
  ): Promise<EntityOutput[]> {
    const make = composeMakeRequest()

    const promises = entityDefinitions.map(definition => {
      return make(definition)
    })

    const outputs: EntityOutput[] = await Promise.all(promises)

    return outputs
  }
}
