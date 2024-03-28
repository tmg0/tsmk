import destr from 'destr'
import { execaCommand } from 'execa'
import type { AcaoContext, AcaoJobStep, RunCmd, RunOptions } from './types'
import { isString } from './utils'

export function defineRunner(setup: AcaoJobStep) {
  return setup
}

export function runRunner(runner: AcaoJobStep) {
  return runner(undefined, {} as any)
}

export function run(cmd: RunCmd, options: Partial<RunOptions> = {}) {
  return defineRunner(async (prev: any, ctx: AcaoContext) => {
    const _cmd = isString(cmd) ? cmd : await cmd(prev, ctx)
    const ssh = options.ssh && ctx.ssh
    const { stdout } = ssh ? await ctx.ssh?.execCommand(_cmd, options) : await execaCommand(_cmd, options)
    if (!options.transform)
      return destr(stdout)
    return options.transform(stdout)
  })
}
