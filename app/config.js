import envSchema from 'env-schema'
import CommonESM from '@uscreen.de/common-esm'

const { join } = new CommonESM(import.meta.url)
const { PORT = 3000 } = process.env

const schema = {
  type: 'object',
  properties: {
    httpPort: { default: PORT },
    httpBind: { default: '0.0.0.0' },
    prefix: { default: '/v1' },
    logEnabled: { default: true },
    logLevel: { default: 'info' }
  }
}

const config = envSchema({
  schema,
  dotenv: true
})

config.autoloads = [join('plugins'), join('services')]

config.swagger = {
  routePrefix: `${config.prefix}/docs`,
  exposeRoute: true,
  addModels: true
}

config.health = {
  exposeStatusRoute: `${config.prefix}/health`
}

export default config
