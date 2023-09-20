import { EnumFetcher } from '../types/enums-fetcher/EnumFetcher.js'
import { EnumsFetcher } from '../types/enums-fetcher/EnumsFetcher.js'
import { TsEnum } from '../types/enums-fetcher/TsEnum.js'
import { ComplexTypeOutput } from '../types/out/ComplexTypeOutput.js'
import { EntityOutput } from '../types/out/EntityOutput.js'
import { EnumOutput } from '../types/out/EnumOutput.js'
import { PersistResponse } from '../types/persist/PersistResponse.js'
import { TsEntity } from '../types/types-fetcher/TsEntity.js'
import { TypeFetcher } from '../types/types-fetcher/TypeFetcher.js'
import { TypesFetcher } from '../types/types-fetcher/TypesFetcher.js'
import cliProgress from 'cli-progress'
import chalk from 'chalk'

export interface TsGeneratorInPlugin {
  fetchEntityDefinition: TypeFetcher['fetch']
  fetchEntityDefinitions: TypesFetcher['fetch']
  fetchEnumDefinition?: EnumFetcher['fetch']
  fetchEnumDefinitions?: EnumsFetcher['fetch']
  fetchComplexDefinition?: TypeFetcher['fetch']
  fetchComplexDefinitions?: TypesFetcher['fetch']
}

export interface TsGeneratorOutPlugin {
  makeEntityType: (entityDefinition: TsEntity) => Promise<EntityOutput>
  makeEntityTypes: (entityDefinitions?: TsEntity[]) => Promise<EntityOutput[]>
  makeEnumType: (enumDefinition: TsEnum) => Promise<EnumOutput>
  makeEnumTypes: (enumDefinitions?: TsEnum[]) => Promise<EnumOutput[]>
  makeComplexType?: (entityDefinition: TsEntity) => Promise<ComplexTypeOutput>
  makeComplexTypes?: (entityDefinitions?: TsEntity[]) => Promise<ComplexTypeOutput[]>
}

export interface TsGeneratorPersistPlugin {
  persistEntityType: (output: EntityOutput) => Promise<PersistResponse>
  persistEntityTypes: (outputs: EntityOutput[]) => Promise<PersistResponse[]>
  persistEnumType: (output: EnumOutput) => Promise<PersistResponse>
  persistEnumTypes: (outputs: EnumOutput[]) => Promise<PersistResponse[]>
  persistComplexType: (output: ComplexTypeOutput) => Promise<PersistResponse>
  persistComplexTypes: (outputs: ComplexTypeOutput[]) => Promise<PersistResponse[]>
}

export interface TsGeneratorTask {
  in: TsGeneratorInPlugin
  out: TsGeneratorOutPlugin[]
  persisters: TsGeneratorPersistPlugin[]
}

export interface TsGeneratorConfig {
    tasks: {
      default: TsGeneratorTask
      [key: string]: TsGeneratorTask
    }
}

export function TsGenerator (config: TsGeneratorConfig) {
  return {
    generateEntities: async (options: {
      entities?: string[],
      task?: string
    }) => {
      if (options.task && !config.tasks[options.task]) {
        throw new Error(`Task with name ${options.task} does not exist.`)
      }
      const task = config.tasks[options.task]

      let definitions: TsEntity[] = []
      /**
       * Get the definition/s
       */
      console.log(chalk.blue('getting definitions'))
      if (!options.entities) {
        definitions = await task.in.fetchEntityDefinitions()
      } else if (options.entities.length === 1) {
        definitions[0] = await task.in.fetchEntityDefinition(options.entities[0])
      } else {
        definitions = await task.in.fetchEntityDefinitions(options.entities)
      }

      /**
       * Generate and persist the entity definition/s
       */
      console.log(chalk.blue('generating and persisting entities'))
      for (const outPlugin of task.out) {
        if (definitions.length === 1) {
          outPlugin.makeEntityType(definitions[0]).then(output => {
            task.persisters.forEach(persister => {
              persister.persistEntityType(output)
            })
          })
        } else {
          outPlugin.makeEntityTypes(definitions).then(outputs => {
            task.persisters.forEach(persister => {
              persister.persistEntityTypes(outputs)
            })
          })
        }
      }
    },
    generateComplexTypes: async (options: {
      complexTypes?: string[],
      task?: string
    }) => {
      if (options.task && !config.tasks[options.task]) {
        throw new Error(`Task with name ${options.task} does not exist.`)
      }
      const task = config.tasks[options.task]

      let definitions: TsEntity[] = []
      /**
       * Get the complex type/s
       */
      console.log(chalk.magenta('getting complex types'))
      if (!options.complexTypes) {
        definitions = await task.in.fetchComplexDefinitions()
      } else if (options.complexTypes.length === 1) {
        definitions[0] = await task.in.fetchComplexDefinition(options.complexTypes[0])
      } else {
        definitions = await task.in.fetchComplexDefinitions(options.complexTypes)
      }

      /**
       * Generate and persist the complex type/s
       */
      console.log(chalk.magenta('generating and persisting complex types'))
      for (const outPlugin of task.out) {
        if (definitions.length === 1) {
          outPlugin.makeComplexType?.(definitions[0]).then(output => {
            task.persisters.forEach(persister => {
              persister.persistComplexType(output)
            })
          })
        } else {
          outPlugin.makeComplexTypes?.(definitions).then(outputs => {
            task.persisters.forEach(persister => {
              persister.persistComplexTypes(outputs)
            })
          })
        }
      }
    },
    generateEnums: async (options: {
      enumNames?: string[],
      task?: string
    }) => {
      if (options.task && !config.tasks[options.task]) {
        throw new Error(`Task with name ${options.task} does not exist.`)
      }
      const task = config.tasks[options.task]

      let definitions: TsEnum[] = []
      /**
       * Get the definition/s
       */
      console.log(chalk.cyan('getting enum definitions'))
      if (!options.enumNames) {
        definitions = await task.in.fetchEnumDefinitions()
      } else if (options.enumNames.length === 1) {
        definitions[0] = await task.in.fetchEnumDefinition(options.enumNames[0])
      } else {
        definitions = await task.in.fetchEnumDefinitions(options.enumNames)
      }

      /**
       * Generate and persist the enum definition/s
       */
      console.log(chalk.cyan('generating and persisting enums'))
      for (const outPlugin of task.out) {
        if (definitions.length === 1) {
          outPlugin.makeEnumType(definitions[0]).then(output => {
            task.persisters.forEach(persister => {
              persister.persistEnumType(output)
            })
          })
        } else {
          outPlugin.makeEnumTypes(definitions).then(outputs => {
            task.persisters.forEach(persister => {
              persister.persistEnumTypes(outputs)
            })
          })
        }
      }
    },
  }
}
