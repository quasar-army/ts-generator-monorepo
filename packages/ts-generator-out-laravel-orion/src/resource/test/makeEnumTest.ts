import { TsEnum } from '@quasar-army/ts-generator'
import { PiniaOrmPlugin } from '../../../index.js'
import allFetchedEnums from './allFetchedEnums.json' assert { type: 'json' }
import chalk from 'chalk'

process.removeAllListeners('warning')

const enumName = process.argv[2] || allFetchedEnums[0].name

const enumDefinition = (allFetchedEnums as TsEnum[])
  .find(enumDefinition => enumDefinition.name === enumName)

const result = PiniaOrmPlugin.makeEnum(enumDefinition)

console.log(chalk.greenBright.bold(result))
