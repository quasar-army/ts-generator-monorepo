import { config as loadDotEnv } from 'dotenv'
import { xml2js } from 'xml-js'
import { GraphEnumDefinition } from '../types/MsGraph.js'
import { keyBy } from 'lodash-es'

loadDotEnv()
export const enumsKey = 'ts-generator-in-ms-graph:enums'
export const enumsKeyedKey = 'ts-generator-in-ms-graph:enumsKeyed'

function makeFetchDefinitionUrl () {
  const api = process.env.MICROSOFT_GRAPH_API
  const apiVersion = process.env.MICROSOFT_GRAPH_API_VERSION
  return `${api}/${apiVersion}/$metadata`
}

const cachedEnums: {
  enums?: GraphEnumDefinition[],
  enumsKeyed?: Record<string, GraphEnumDefinition>
} = {}

export async function fetchEnums (): Promise<{
  enums: GraphEnumDefinition[],
  enumsKeyed: Record<string, GraphEnumDefinition>
}> {
  if (cachedEnums.enums && cachedEnums.enumsKeyed) {
    return {
      enums: cachedEnums.enums,
      enumsKeyed: cachedEnums.enumsKeyed,
    }
  }

  console.log('fetching enums')
  const response = await fetch(makeFetchDefinitionUrl())
  const responseData = await response.text()
  if (!response.ok) {
    throw new Error(`request error: ${response.status}`)
  }
  const data = xml2js(responseData, { compact: true })
  const schemas = data['edmx:Edmx']['edmx:DataServices'].Schema
  const enumTypes = (schemas[0].EnumType as GraphEnumDefinition[])
  enumTypes.forEach(enumType => {
    if (!Array.isArray(enumType.Member)) {
      enumType.Member = [enumType.Member]
    }
  })

  const enumsKeyed = keyBy(enumTypes, enumType => enumType._attributes.Name)

  cachedEnums.enums = enumTypes
  cachedEnums.enumsKeyed = enumsKeyed

  return { enums: enumTypes, enumsKeyed }
}
