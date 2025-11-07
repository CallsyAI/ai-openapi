import ApiClaudeCode from "./integrations/claudeCode/apiClaudeCode"
import buildPrompt from "../prompts/prompt"
import {CliOptions, resolveDefaults} from "../bin/defaults"

export default async function generate(options: CliOptions = {}) {
    console.log("Generating OpenAPI documentation from API routes...")

    const opts = resolveDefaults(options)

    // Build prompt props from resolved options.
    const props = {
        APPLICATION_EXPLANATION: {
            type: "file" as const,
            content: opts.applicationExplanation!
        },
        ENDPOINT_GUIDANCE: {
            type: "file" as const,
            content: opts.endpointGuidance!
        },
        ADDITIONAL_CONSTRAINTS: {
            type: "file" as const,
            content: opts.additionalConstraints!
        }
    }

    const promptText = buildPrompt(props as any)

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
        model: "claude-sonnet-4-5",
        permissionMode: "acceptEdits",
        cwd: process.cwd(),
        pathToClaudeCodeExecutable: "/opt/homebrew/bin/claude",
        allowedTools: ["Read", "Write", "Glob", "Grep", "Bash"],
        apiKey: opts.anthropicApiKey,
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
