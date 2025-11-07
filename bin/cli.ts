#!/usr/bin/env node

import {Command} from 'commander'
import {build, cleanup, deploy, full, generate, validate} from '../index'
import {CliOptions} from "./defaults"

const program = new Command()

program
    .name('ai-openapi')
    .description('Generate OpenAPI documentation using AI.')
    .version('1.0.0')

addOptions(program.command('generate'))
    .description('Generate OpenAPI documentation using AI.')
    .action(middleware(generate))

addOptions(program.command('build'))
    .description('Build final OpenAPI spec from schemas and routes.')
    .action(middleware(build))

addOptions(program.command('validate'))
    .description('Validate OpenAPI specification.')
    .action(middleware(validate))

addOptions(program.command('deploy'))
    .description('Deploy OpenAPI spec to README.com.')
    .action(middleware(deploy))

addOptions(program.command('cleanup'))
    .description('Delete generated OpenAPI file.')
    .action(middleware(cleanup))

addOptions(program.command('full'))
    .description('Run complete workflow (generate -> build -> validate -> deploy -> cleanup).')
    .action(middleware(full))

program.parse()

/**
 * Error handling middleware for CLI commands.
 */
function middleware(fn: (opts: CliOptions) => Promise<void>) {
    return async (opts: CliOptions) => {
        try {
            await fn(opts)
        } catch (error: any) {
            console.error(error?.message?.trim() || "No error message.")
            process.exit(1)
        }
    }
}

/**
 * Adds all available options for a command for simplicity.
 */
function addOptions(command: Command): Command {
    const options = [
        ['--doc-dir <path>', 'Path to documentation folder.'],
        ['--additional-instructions <path>', 'Path to additional instructions file.'],
        ['--anthropic-api-key <key>', 'Anthropic API key (default from ANTHROPIC_API_KEY env).'],
        ['--readme-api-key <key>', 'Readme API key (default from README_API_KEY env).'],
        ['--base-file <path>', 'Path to base openapi.json file.']
    ]
    options.forEach(opt => command.option(...opt as [string, string]))
    return command
}
