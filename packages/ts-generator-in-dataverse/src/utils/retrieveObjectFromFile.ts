import { readFile } from 'node:fs/promises'
import { AuthCredentials } from './authenticate.js'

export async function retrieveObjectFromFile (path: string) {
  const objAsString = (await readFile(path)).toString()
  return JSON.parse(objAsString) as AuthCredentials
}
