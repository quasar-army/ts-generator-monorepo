import { shape } from './type-fetcher/shape.js'
import { shapeEnum } from './enums-fetcher/shapeEnum.js'
import { TsEntity, TsEnum, TsGeneratorInPlugin } from '@quasar-army/ts-generator'
import { saveObjectToFile } from './utils/saveObjectToFile.js'
import { fetchDefinitions } from './type-fetcher/fetchDefinitions.js'
import { fetchEnum } from './enums-fetcher/fetchEnum.js'
import { fetchEnums } from './enums-fetcher/fetchEnums.js'

export async function fetchEntityDefinition (entity: string) {
  const definition = (await fetchDefinitions()).entities[entity]
  const shaped = await shape(definition)
  return shaped
}

export async function fetchEntityDefinitions (only?: string[]) {
  let entities = Object.values((await fetchDefinitions()).entities)
  if (only) {
    entities = entities.filter(entity => only.includes(entity._attributes.Name))
  }

  const shaped: TsEntity[] = []
  for (const entity of entities) {
    shaped.push(await shape(entity))
  }
  await saveObjectToFile(shaped, 'allFetchedTypes.json')

  return shaped
}

export async function fetchComplexDefinition (entity: string) {
  const definition = (await fetchDefinitions()).complexTypes[entity]
  const shaped = await shape(definition)
  return shaped
}

export async function fetchComplexDefinitions (only?: string[]) {
  let allTypes = Object.values((await fetchDefinitions()).all)
  if (only) {
    allTypes = allTypes.filter(complexType => only.includes(complexType._attributes.Name))
  }

  const shaped: TsEntity[] = []
  for (const complexType of allTypes) {
    shaped.push(await shape(complexType))
  }
  await saveObjectToFile(shaped, 'allFetchedComplexTypes.json')

  return shaped
}

export async function fetchEnumDefinition (enumName: string) {
  const definition = await fetchEnum(enumName)
  const shaped = await shapeEnum(definition)
  return shaped
}

export async function fetchEnumDefinitions (only?: string[]) {
  const availableEnums = (await fetchEnums()).enums
  const shaped: TsEnum[] = []
  for (const availableEnum of availableEnums) {
    if (
      (Array.isArray(only) && only.includes(availableEnum._attributes.Name)) ||
      !Array.isArray(only)
    ) {
      shaped.push(await shapeEnum(availableEnum))
    }
  }
  await saveObjectToFile(shaped, 'allFetchedEnums.json')
  return shaped
}

export function MakeInMsGraph (): TsGeneratorInPlugin {
  return {
    fetchEntityDefinition,
    fetchEntityDefinitions,
    fetchEnumDefinition,
    fetchEnumDefinitions,
    fetchComplexDefinition,
    fetchComplexDefinitions,
  }
}
