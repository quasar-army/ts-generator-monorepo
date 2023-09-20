import { TsGeneratorInPlugin, TsEntity, TsFieldDefinition } from '@quasar-army/ts-generator'
import { readFile } from 'node:fs/promises'
import fastGlob from 'fast-glob'
import { typeShapersMap } from './shapers/typeShapersMap.js'
import { FieldSchema } from './types/FieldSchema.js'
import { pascalCase } from 'change-case'
import { RelationshipSchema } from './types/RelationshipSchema.js'
import { ImportingSchema } from './types/ImportingSchema.js'

export async function fetchEntityDefinition (entity: string): ReturnType<TsGeneratorInPlugin['fetchEntityDefinition']> {
  // get
  return {
    entity: 'example',
    fields: [

    ],
    namePascal: 'Example',
    primaryKey: 'id',
  }
}

export async function fetchEntityDefinitions (only?: string[]): ReturnType<TsGeneratorInPlugin['fetchEntityDefinitions']> {
  const result: TsEntity[] = []

  const schemaFiles = await fastGlob('./schemas/*.schema.json')

  const schemas: Record<string, ImportingSchema> = {}
  for (const schemaFile of schemaFiles) {
    const schemaRaw = await readFile(schemaFile, { encoding: 'utf-8' })
    const schema: ImportingSchema = JSON.parse(schemaRaw)
    schemas[schema.$id] = schema
  }

  for (const [schemaId, schema] of Object.entries(schemas)) {
    const fields: TsFieldDefinition[] = []
    for (const [fieldKey, field] of Object.entries(schema.properties)) {
      let fieldType: string

      if (field.relationship) {
        fieldType = field.relationship
      } else if (field.type === 'array') {
        if (field.items?.type === 'string') {
          fieldType = 'array_of_strings'
        }
        if (field.items?.type === 'number') {
          fieldType = 'array_of_numbers'
        }
        if (field.items?.type === 'object') {
          fieldType = 'array_of_objects'
        }
      } else {
        fieldType = field.type
      }

      const makeFieldFunction = typeShapersMap[fieldType]

      const shaped = makeFieldFunction(fieldKey, field, schemas)
      if (shaped) {
        fields.push(shaped)
      }
    }

    result.push({
      entity: schema.entity,
      fields,
      namePascal: pascalCase(schema.title),
      primaryKey: 'id',
    })
  }

  return result
}

export function MakeInJsonSchema (): TsGeneratorInPlugin {
  return {
    fetchEntityDefinition,
    fetchEntityDefinitions,
  }
}
