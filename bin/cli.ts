#!/usr/bin/env node

import {Command} from 'commander'
import {generate, build, validate, deploy, cleanup, full} from '../index'
import {CliOptions} from "./defaults"

const program = new Command()

program
    .name('ai-openapi')
    .description('Generate OpenAPI documentation using AI')
    .version('1.0.0')

addOptions(program.command('generate'))
    .description('Generate OpenAPI documentation using AI')
    .action(async (opts: CliOptions) => await generate(opts))

addOptions(program.command('build'))
    .description('Build final OpenAPI spec from schemas and routes')
    .action(async (opts: CliOptions) => await build(opts))

addOptions(program.command('validate'))
    .description('Validate OpenAPI specification')
    .action(async (opts: CliOptions) => await validate(opts))

addOptions(program.command('deploy'))
    .description('Deploy OpenAPI spec to README.com')
    .action(async (opts: CliOptions) => await deploy(opts))

addOptions(program.command('cleanup'))
    .description('Delete generated OpenAPI file')
    .action(async (opts: CliOptions) => await cleanup(opts))

addOptions(program.command('full'))
    .description('Run complete workflow (generate -> build -> validate -> deploy -> cleanup)')
    .action(async (opts: CliOptions) => await full(opts))

program.parse()

/**
 * Adds all available options for a command for simplicity.
 */
function addOptions(command: Command): Command {
    const options = [
        ['--doc-dir <path>', 'Path to documentation folder', './documentation'],
        ['--application-explanation <path>', 'Path to application explanation file'],
        ['--endpoint-guidance <path>', 'Path to endpoint guidance file'],
        ['--additional-constraints <path>', 'Path to additional constraints file'],
        ['--anthropic-api-key <key>', 'Anthropic API key (default from ANTHROPIC_API_KEY env)'],
        ['--readme-api-key <key>', 'Readme API key (default from README_API_KEY env)'],
        ['--base-file <path>', 'Path to base openapi.json file', './documentation/base.json']
    ]
    options.forEach(opt => command.option(...opt as [string, string, string?]))
    return command
}
