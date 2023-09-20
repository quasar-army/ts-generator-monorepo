import { TsEntity } from '@quasar-army/ts-generator'
import { PiniaOrmPlugin } from '../../index.js'
import allFetchedTypes from './allFetchedTypes.json' assert { type: 'json' }
import chalk from 'chalk'

process.removeAllListeners('warning')

const entityName = process.argv[2] || allFetchedTypes[0].entity

const definition = (allFetchedTypes as TsEntity[])
  .find(definition => definition.entity === entityName)

const result = PiniaOrmPlugin.makeEntity(definition)

console.log(chalk.greenBright.bold(result))
