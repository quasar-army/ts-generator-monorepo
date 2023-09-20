import { readFile } from 'node:fs/promises'

export async function retrieveObjectFromFile (path: string) {
  const objAsString = (await readFile(path)).toString()
  return JSON.parse(objAsString)
}
