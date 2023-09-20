import { writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

export async function writeFileRecursive (path: string, contents: string) {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, contents)
}
