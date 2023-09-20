import { config as loadDotEnv } from 'dotenv'
loadDotEnv()

function makeFetchDefinitionUrl (optionSetName: string) {
  const api = process.env.DATAVERSE_API
  return `${api}/GlobalOptionSetDefinitions(Name='${optionSetName}')`
}

export async function fetchEnums (token: string, optionSetName: string) {
  const headers = {
    Authorization: `bearer ${token}`,
  }

  const response = await fetch(makeFetchDefinitionUrl(optionSetName), { headers })
  const data = await response.json()

  return data
}
