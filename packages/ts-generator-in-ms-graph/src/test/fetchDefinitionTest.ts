import { fetchDefinition } from '../type-fetcher/fetchDefinition.js'
import { shape } from '../type-fetcher/shape.js'

const definition = await fetchDefinition('user')
await shape(definition)
