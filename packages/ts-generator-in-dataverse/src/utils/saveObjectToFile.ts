import { writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

export async function saveObjectToFile (obj: Record<string, any>, path: string) {
  await ensureDirectoryExistence(path)
  await writeFile(path, JSON.stringify(obj, null, 2))
}

async function ensureDirectoryExistence (filePath: string) {
  await mkdir(dirname(filePath), { recursive: true })
}
