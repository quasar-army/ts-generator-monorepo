import { MakeTypesPlugin } from '@quasar-army/ts-generator'
import { makeEntity } from './src/makeEntity.js'
import { makeEnum } from './src/makeEnum.js'

export const PiniaOrmPlugin: MakeTypesPlugin = {
  makeEntity,
  makeEnum,
}
