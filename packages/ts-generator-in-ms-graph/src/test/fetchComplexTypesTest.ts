import { fetchDefinitions } from '../type-fetcher/fetchDefinitions.js'
import { shape } from '../type-fetcher/shape.js'
import { saveObjectToFile } from '../utils/saveObjectToFile.js'

const complexDefinitions = Object.values((await fetchDefinitions()).complexTypes)
const shaped = []
for (const definition of complexDefinitions) {
  try {
    const result = await shape(definition)
    shaped.push(result)
  } catch (error) {
    console.log(definition)
    console.error(error)
  }
}

saveObjectToFile(shaped, './allFetchedComplexTypes.json')
