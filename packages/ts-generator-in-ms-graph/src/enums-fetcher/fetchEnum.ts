import { config as loadDotEnv } from 'dotenv'
import { xml2js } from 'xml-js'
import { GraphEnumDefinition } from '../types/MsGraph.js'
loadDotEnv()

function makeFetchDefinitionUrl () {
  const api = process.env.MICROSOFT_GRAPH_API
  const apiVersion = process.env.MICROSOFT_GRAPH_API_VERSION
  return `${api}/${apiVersion}/$metadata`
}

export async function fetchEnum (enumName: string) {
  const response = await fetch(makeFetchDefinitionUrl())
  const responseData = await response.text()
  if (!response.ok) {
    throw new Error(`request error: ${response.status}`)
  }
  const data = xml2js(responseData, { compact: true })
  const schemas = data['edmx:Edmx']['edmx:DataServices'].Schema
  const enumTypes = schemas[0].EnumType as GraphEnumDefinition[]

  const enumType = enumTypes.find(enumType => {
    return enumType._attributes.Name === enumName
  })

  if (!Array.isArray(enumType.Member)) {
    enumType.Member = [enumType.Member]
  }

  return enumType
}
