import { authenticate } from './utils/authenticate.js'
import { fetchDefinition } from './type-fetcher/fetchDefinition.js'
import { fetchEntities } from './type-fetcher/fetchEntities.js'
import { fetchOptionSet } from './enums-fetcher/fetchOptionSet.js'
import { shape } from './type-fetcher/shape.js'
import { shapeEnum } from './enums-fetcher/shapeEnum.js'
import { TsEntity, TsEnum, TsGeneratorInPlugin } from '@quasar-army/ts-generator'
import { saveObjectToFile } from './utils/saveObjectToFile.js'
import { fetchOptionSets } from './enums-fetcher/fetchOptionSets.js'

export async function fetchEntityDefinition (entity: string) {
  const token = await authenticate()
  const definition = await fetchDefinition(token.token, entity)
  const shaped = await shape(definition)
  return shaped
}

export async function fetchEntityDefinitions (only?: string[]) {
  const token = await authenticate()
  let entities = await fetchEntities(token.token)
  if (only) {
    entities = entities.filter(entity => only.includes(entity.logicalname))
  }

  const shaped: TsEntity[] = []
  for (const entity of entities) {
    const definition = await fetchDefinition(token.token, entity.logicalname)
    shaped.push(await shape(definition))
  }
  await saveObjectToFile(shaped, 'allFetchedTypes.json')
  return shaped
}

export async function fetchEnumDefinition (enumName: string) {
  const token = await authenticate()
  const definition = await fetchOptionSet(token.token, enumName)
  const shaped = await shapeEnum(definition)
  return shaped
}

export async function fetchEnumDefinitions (only?: string[]) {
  const token = await authenticate()
  const optionSets = await fetchOptionSets(token.token)
  await saveObjectToFile(optionSets, 'allFetchedEnums.json')
  const shaped: TsEnum[] = []
  // for (const optionSet of optionSets.value) {
  //   if (
  //     (Array.isArray(only) && only.includes(optionSet.Name)) ||
  //     !Array.isArray(only)
  //   ) {
  //     shaped.push(await shapeEnum(optionSet))
  //   }
  // }
  // await saveObjectToFile(shaped, 'allFetchedEnums.json')
  return shaped
}

export function MakeInDataverse (): TsGeneratorInPlugin {
  return {
    fetchEntityDefinition,
    fetchEntityDefinitions,
    fetchEnumDefinition,
    fetchEnumDefinitions,
  }
}
