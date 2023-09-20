import { writeFile } from 'node:fs/promises'

export async function saveObjectToFile (obj: Record<string, any> | any[], path: string) {
  writeFile(path, JSON.stringify(obj, null, 2))
}
