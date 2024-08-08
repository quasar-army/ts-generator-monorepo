import { EntityOutput, TsEntity } from '@quasar-army/ts-generator'
import { composeMakeMigration } from './composeMakeMigration.js'

export function composeMakeMigrations () {
  return async function makeMigrations (
    entityDefinitions: TsEntity[],
  ): Promise<EntityOutput[]> {
    const make = composeMakeMigration()

    const promises = entityDefinitions.map(definition => {
      return make(definition)
    })

    const outputs: EntityOutput[] = await Promise.all(promises)

    return outputs
  }
}
