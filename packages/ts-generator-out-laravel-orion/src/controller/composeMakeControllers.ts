import { EntityOutput, TsEntity } from '@quasar-army/ts-generator'
import { composeMakeController } from './composeMakeController.js'

export function composeMakeControllers () {
  return async function makeControllers (
    entityDefinitions: TsEntity[],
  ): Promise<EntityOutput[]> {
    const make = composeMakeController()

    const promises = entityDefinitions.map(definition => {
      return make(definition)
    })

    const outputs: EntityOutput[] = await Promise.all(promises)

    return outputs
  }
}
