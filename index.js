/**
 * @callsy/ai-openapi
 * Automatically generate OpenAPI documentation using AI.
 */

const generate = require('./src/generate')
const build = require('./src/build')
const validate = require('./src/validate')
const deploy = require('./src/deploy')
const cleanup = require('./src/cleanup')
const full = require('./src/full')

module.exports = {
  generate,
  build,
  validate,
  deploy,
  cleanup,
  full
}
