#!/usr/bin/env node

const {
    generate,
    build,
    validate,
    deploy,
    cleanup,
    full
} = require('../index')

const commands = {
    generate,
    build,
    validate,
    deploy,
    cleanup,
    full
}

const command = process.argv[2]

if (!command || !commands[command]) {
    console.error(`
Usage: ai-openapi <command> [options]

Commands:
  generate    Generate OpenAPI documentation using AI
  build       Build final OpenAPI spec from schemas and routes
  validate    Validate OpenAPI specification
  deploy      Deploy OpenAPI spec to README.com
  cleanup     Delete generated OpenAPI file
  full        Run complete workflow (generate -> build -> validate -> deploy -> cleanup)

Examples:
  npx ai-openapi generate
  npx ai-openapi build
  npx ai-openapi full
`)
    process.exit(1)
}

commands[command]()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.error('Error:', error.message)
        process.exit(1)
    })
