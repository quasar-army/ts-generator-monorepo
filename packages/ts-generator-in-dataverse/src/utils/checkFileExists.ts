import { access } from 'node:fs/promises'

export async function checkFileExists (path: string) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}
