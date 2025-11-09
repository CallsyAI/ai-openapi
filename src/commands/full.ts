import generate from './generate'
import build from './build'
import validate from './validate'
import deploy from './deploy'
import cleanup from './cleanup'
import {Options} from "../options"

export default async function full(options: Partial<Options> = {}) {
    console.log("Starting full OpenAPI documentation workflow...")

    const steps = [
        {name: "Generate", fn: () => generate(options)},
        {name: "Build", fn: () => build(options)},
        {name: "Validate", fn: () => validate(options)},
        {name: "Deploy", fn: () => deploy(options)},
        {name: "Cleanup", fn: () => cleanup(options)}
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
