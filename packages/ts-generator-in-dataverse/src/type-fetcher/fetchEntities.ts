import { config as loadDotEnv } from 'dotenv'
loadDotEnv()

export interface FetchEntitiesResponse {
  value: {
    logicalname: string
    entityid: string
  }[]
}

function makeFetchEntitiesUrl () {
  const api = process.env.DATAVERSE_API
  return `${api}/entities?$select=logicalname`
}

export async function fetchEntities (token: string) {
  const headers = {
    Authorization: `bearer ${token}`,
  }

  const response = await fetch(makeFetchEntitiesUrl(), { headers })
  const data = (await response.json()) as FetchEntitiesResponse

  return data.value
}
