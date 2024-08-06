import { EntityOutput, TsEntity } from '@quasar-army/ts-generator'
import { composeMakeMigration } from './composeMakeMigration.js'

export function composeMakeMigrations (options: {
  enumsDir?: string
  interfaceImportDir?: string
  idFieldDecorator?: string
}) {
  return async function makeMigrations (
    entityDefinitions: TsEntity[],
  ): Promise<EntityOutput[]> {
    const make = composeMakeMigration(options)

    const promises = entityDefinitions.map(definition => {
      return make(definition)
    })

    const outputs: EntityOutput[] = await Promise.all(promises)

    return outputs
  }
}
