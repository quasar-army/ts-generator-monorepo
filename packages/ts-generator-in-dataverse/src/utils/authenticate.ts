import { spawn } from 'node:child_process'
import { config as loadDotEnv } from 'dotenv'
import { saveObjectToFile } from './saveObjectToFile.js'
import { resolve as resolvePath } from 'node:path'
import { checkTokenValid } from './checkTokenValid.js'
import { retrieveObjectFromFile } from './retrieveObjectFromFile.js'

loadDotEnv()

const shouldSaveCredentials = process.env.DATAVERSE_SAVE_CREDENTIALS

export interface AuthCredentials {
  token: string
  refreshToken: string
  expiresOn: string
}

const dataverseEndpoint = process.env.DATAVERSE_AUTH_ENDPOINT

const tokenRegex = /accessToken: '([^']*)/g
const expiresOnRegex = /expiresOn: ([^,]*)/g
const refreshTokenRegex = /refreshToken: '([^']*)/g

function getTokenFromOutput (output: string) {
  const tokenMatches = Array.from(output.matchAll(tokenRegex), m => m[1])
  return tokenMatches[0]
}

function getExpiresOnFromOutput (output: string) {
  const tokenMatches = Array.from(output.matchAll(expiresOnRegex), m => m[1])
  return tokenMatches[0]
}

function getRefreshTokenFromOutput (output: string) {
  const tokenMatches = Array.from(output.matchAll(refreshTokenRegex), m => m[1])
  return tokenMatches[0]
}

async function handleSaveCredentials (credentials: AuthCredentials) {
  if (shouldSaveCredentials) {
    await saveObjectToFile(credentials, resolvePath('../credentials.json'))
  }
}

export async function authenticate (): Promise<AuthCredentials> {
  try {
    const savedCredentials = await retrieveObjectFromFile(resolvePath('../credentials.json'))
    const expiresOn = savedCredentials?.expiresOn

    if (expiresOn && checkTokenValid(savedCredentials)) {
      return savedCredentials
    }
  } catch (error) {
    console.log('credentials file not found. Authenticating.')
  }

  return new Promise((resolve, reject) => {
    try {
      if (!dataverseEndpoint) {
        throw new Error('Dataverse endpoint not set')
      }
      const authCommand = spawn('pnpm', ['dataverse-auth', dataverseEndpoint])

      authCommand.stdout.on('data', async (data) => {
        const dataAsString = data.toString()
        if (dataAsString.charAt(0) === '{') {
          const credentials: AuthCredentials = {
            token: getTokenFromOutput(dataAsString),
            expiresOn: getExpiresOnFromOutput(dataAsString),
            refreshToken: getRefreshTokenFromOutput(dataAsString),
          }

          handleSaveCredentials(credentials)

          resolve(credentials)
        }
      })
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}
