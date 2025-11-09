import ClaudeIntegration from "../integrations/claudeIntegration"
import buildPrompt from "../../prompts/prompt"
import {Options} from "../options"
import Config from "../config"

export default async function generate(options: Partial<Options> = {}) {
    const cfg = new Config(options)

    console.log("Generating OpenAPI documentation from API routes...")

    const promptText = buildPrompt(cfg)

    const ALLOWED_BASH_COMMANDS = [
        "npx ai-openapi build",
        "npx ai-openapi validate",
        "npx ai-openapi cleanup"
    ]

    const ALLOW_ACTION = (input: any) => {
        return {behavior: "allow" as const, updatedInput: input}
    }
    const DENY_ACTION = (message: string) => {
        return {behavior: "deny" as const, message: message}
    }

    const agent = new ClaudeIntegration(cfg.anthropicApiKey(), {
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
