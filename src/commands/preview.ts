import { loadConfig } from 'c12'
import { defineCommand } from 'citty'
import type { Options } from '../core/types'
import { createAcao } from '../core/context'

export default defineCommand({
  meta: { name: 'preview' },
  async run() {
    const { config } = await loadConfig<Options>({ name: 'acao', rcFile: false })
    const ctx = createAcao(config)
    console.log(JSON.stringify(ctx.jobs, null, 2))
  },
})