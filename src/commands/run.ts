import { defineCommand } from 'citty'
import { loadConfig } from 'c12'
import type { Options } from '../core/types'
import { createAcao } from '../core/context'

export async function run(filters: string[] = []) {
  const { config } = await loadConfig<Options>({ name: 'acao', rcFile: false })
  await createAcao(config).runJobs(filters)
}

export default defineCommand({
  meta: { name: 'run', description: 'Run jobs' },

  args: {
    JOB: {
      type: 'positional',
      description: 'Specific job name, single job or list of jobs',
      required: false,
    },
  },

  async run(ctx) {
    run(ctx.args._)
  },
})
