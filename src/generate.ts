import ApiClaudeCode from "./integrations/claudeCode/apiClaudeCode"
import buildPrompt from "../prompts/prompt"
import {CliOptions, resolveDefaults} from "../bin/defaults"
import {must} from "./util/must"

export default async function generate(options: CliOptions = {}) {
    const opts = resolveDefaults(options)

    console.log("Generating OpenAPI documentation from API routes...")

    const additional = must(opts.additionalInstructions, "Additional instructions")
    const promptText = buildPrompt({instructionsPath: additional})

    const ALLOWED_BASH_COMMANDS = [
        "npx ai-openapi build",
        "npx ai-openapi validate"
    ]

    const ALLOW_ACTION = (input: any) => {
        return {behavior: "allow" as const, updatedInput: input}
    }
    const DENY_ACTION = (message: string) => {
        return {behavior: "deny" as const, message: message}
    }

    const agent = new ApiClaudeCode({
        apiKey: opts.anthropicApiKey,
        allowedTools: ["Read", "Write", "Glob", "Grep", "Bash"],
        canUseTool: async (toolName, input) => {
            if (toolName === "Bash") {
                const command = input.command as string
                const isAllowed = ALLOWED_BASH_COMMANDS.some(allowed => command.trim() === allowed)
                if (!isAllowed) return DENY_ACTION("This action is not allowed for you.")
            }
            return ALLOW_ACTION(input)
        }
    })

    const result = await agent.run(promptText)

    console.log("OpenAPI documentation generation complete!")
    console.log(`Duration: ${result.duration_ms}ms (${(result.duration_ms / 1000).toFixed(1)}s)`)
    console.log(`Cost: $${result.total_cost_usd.toFixed(4)}`)
}
