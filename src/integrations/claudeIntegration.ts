import {type Options as AnthropicOptions, query, type SDKResultMessage} from "@anthropic-ai/claude-agent-sdk"

export default class ClaudeIntegration {
    public constructor(apiKey: string, private readonly options?: AnthropicOptions) {
        this.options = {
            ...options,
            model: options?.model || "claude-sonnet-4-5",
            permissionMode: options?.permissionMode || "acceptEdits",
            cwd: options?.cwd || process.cwd(),
            pathToClaudeCodeExecutable: options?.pathToClaudeCodeExecutable || "claude",
            env: {
                ...options?.env,
                PATH: process.env.PATH,
                ANTHROPIC_API_KEY: apiKey
            }
        }
    }

    /**
     * Runs an agent as a non-interactive process.
     */
    public async run(prompt: string): Promise<SDKResultMessage> {
        let resultMessage: SDKResultMessage | null = null

        const agentQuery = query({
            prompt: prompt,
            options: this.options
        })

        for await (const message of agentQuery) {
            // Output text content, tool usage, and tool results for visibility.
            if (message.type === "assistant" && message.message.content) {
                for (const content of message.message.content) {
                    // Log assistant's text.
                    if (content.type === "text") {
                        console.log(content.text)
                    }

                    // Log tool use.
                    if (content.type === "tool_use") {
                        console.log(`[Tool: ${content.name}]: ${JSON.stringify(content.input, null, 2)}`)
                    }
                }
            }

            // Log tool use progress.
            if (message.type === "tool_progress") {
                const elapsed = Math.floor(message.elapsed_time_seconds)
                console.log(`[Progress: ${message.tool_name}] ${elapsed}s`)
            }

            // Log result.
            if (message.type === "result") {
                console.log(`[Completed]: ${message.subtype}`)
            }

            if (message.type === "result") {
                resultMessage = message
            }
        }

        if (!resultMessage) {
            throw new Error("Agent query completed without a result message.")
        }

        if (resultMessage.subtype !== "success") {
            throw new Error(`Agent query failed: ${resultMessage.errors.join(", ")}.`)
        }

        return resultMessage
    }
}
