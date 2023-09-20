import { fetchDefinitions } from '../type-fetcher/fetchDefinitions.js'
import { shape } from '../type-fetcher/shape.js'
import { saveObjectToFile } from '../utils/saveObjectToFile.js'

const entityDefinitions = Object.values((await fetchDefinitions()).entities)
const shaped = []
for (const definition of entityDefinitions) {
  try {
    const result = await shape(definition)
    shaped.push(result)
  } catch (error) {
    console.log(definition)
    console.error(error)
  }
}

saveObjectToFile(shaped, './allFetchedTypes.json')
