import { EntityOutput, TsEntity } from '@quasar-army/ts-generator'
import { composeMakeModel } from './composeMakeModel.js'

export function composeMakeModels () {
  return async function makeModels (
    entityDefinitions: TsEntity[],
  ): Promise<EntityOutput[]> {
    const make = composeMakeModel()

    const promises = entityDefinitions.map(definition => {
      return make(definition)
    })

    const outputs: EntityOutput[] = await Promise.all(promises)

    return outputs
  }
}
