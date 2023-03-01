import * as core from '@actions/core'
import * as path from 'path'
import {exec} from 'child_process'
import {readFileSync} from 'fs'

function genSyncUrl(name: string): string {
  return `https://registry-direct.npmmirror.com/${name}/sync?sync_upstream=true`
}

export async function sync(name: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const url = genSyncUrl(name)
    core.debug(`sync url: ${url}`)
    exec(`curl -X PUT ${url}`, (err, stdout, stderr) => {
      if (err) {
        core.error(err)
        reject(new Error('sync failed'))
      }
      core.info(stdout)
      core.error(stderr)
      resolve(true)
    })
  })
}

export async function run(): Promise<void> {
  try {
    // core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    let name = core.getInput('name')
    if (!name) {
      core.warning(`without name, change to use the name from package.json`)
      const src = path.resolve(process.cwd(), 'package.json')
      core.debug(`project root: ${src}`)
      const packageJson = JSON.parse(readFileSync(src).toString())
      name = packageJson['name']
    }
    core.debug(`package name: ${name}`)
    await sync(name)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
