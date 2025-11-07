import generate from './generate'
import build from './build'
import validate from './validate'
import deploy from './deploy'
import cleanup from './cleanup'
import {CliOptions, resolveDefaults} from "../bin/defaults"

export default async function full(options: CliOptions = {}) {
    const opts = resolveDefaults(options)

    console.log("Starting full OpenAPI documentation workflow...")

    const steps = [
        {name: "Generate", fn: () => generate(opts)},
        {name: "Build", fn: () => build(opts)},
        {name: "Validate", fn: () => validate(opts)},
        {name: "Deploy", fn: () => deploy(opts)},
        {name: "Cleanup", fn: () => cleanup(opts)}
    ]

    for (const step of steps) {
        console.log(`${"=".repeat(60)}`)
        console.log(`Step: ${step.name}.`)
        console.log("=".repeat(60))

        try {
            await step.fn()
        } catch (error: any) {
            console.error(`❌ Failed at step: ${step.name}. Message: ${error.message}.`)
            process.exit(1)
        }
    }

    console.log(`${"=".repeat(60)}`)
    console.log("✅ Full OpenAPI documentation workflow completed successfully!")
    console.log("=".repeat(60))
}
