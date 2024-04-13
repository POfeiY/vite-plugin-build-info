import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import { BRANCH_COMMAND, COMMIT_SHOT_HASH_COMMAND, DESCRIBE_COMMAND, USERNAME } from './constants'

export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}

export function getAppInfo() {
  const pkgString = fs.readFileSync(`${process.cwd()}/package.json`, 'utf-8')
  const { name, version } = JSON.parse(pkgString)
  const buildStamp = new Date().toLocaleString()
  return {
    name,
    version,
    buildStamp,
  } as const
}

export function execGitCommand(command: string) {
  if (!command)
    return Promise.resolve('')
  const sh = `git ${command}`
  return new Promise((resolve, reject) => {
    exec(sh, (error, stdout) => error ? reject(error) : resolve(stdout.toString()?.replace('\n', '')))
  })
}

export async function getGitInfo() {
  const commitHash = await execGitCommand(COMMIT_SHOT_HASH_COMMAND)
  const describe = await execGitCommand(DESCRIBE_COMMAND)
  const branch = await execGitCommand(BRANCH_COMMAND)
  const username = await execGitCommand(USERNAME)
  return {
    commitHash,
    describe,
    branch,
    username,
  }
}
