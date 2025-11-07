import {type Options, query, type SDKResultMessage} from "@anthropic-ai/claude-agent-sdk"
import {must} from "../../util/must"

export default class ApiClaudeCode {
  private readonly ANTHROPIC_API_KEY: string
  private readonly options: Options

  public constructor(options?: Options & { apiKey?: string }) {
    this.ANTHROPIC_API_KEY = options?.apiKey || must(process.env.ANTHROPIC_API_KEY, "ANTHROPIC_API_KEY")

    this.options = {
      ...options,
      model: options?.model || "claude-sonnet-4-5",
      permissionMode: options?.permissionMode || "acceptEdits",
      cwd: options?.cwd || process.cwd(),
      env: {
        ...options?.env,
        PATH: process.env.PATH,
        ANTHROPIC_API_KEY: this.ANTHROPIC_API_KEY
      }
    }
  }

  /**
   * Runs an agent as a non-interactive process.
   */
  public async run(prompt: string, options?: {verbose?: boolean}): Promise<SDKResultMessage> {
    let resultMessage: SDKResultMessage | null = null
    const verbose = options?.verbose ?? true

    const agentQuery = query({
      prompt: prompt,
      options: this.options
    })

    for await (const message of agentQuery) {
      if (verbose) {
        // Output text content, tool usage, and tool results for visibility
        if (message.type === "assistant" && message.message.content) {
          for (const content of message.message.content) {
            if (content.type === "text") {
              console.log(content.text)
            } else if (content.type === "tool_use") {
              console.log(`\n[Tool: ${content.name}]`)
              console.log(`Input: ${JSON.stringify(content.input, null, 2)}`)
            }
          }
        } else if (message.type === "tool_progress") {
          const elapsed = Math.floor(message.elapsed_time_seconds)
          console.log(`[Progress: ${message.tool_name}] ${elapsed}s`)
        } else if (message.type === "result") {
          console.log(`\n[Completed]: ${message.subtype}`)
        }
      }

      if (message.type === "result") {
        resultMessage = message
      }
    }

    if (!resultMessage) {
      throw new Error("Agent query completed without a result message")
    }

    if (resultMessage.subtype !== "success") {
      throw new Error(`Agent query failed: ${resultMessage.errors.join(", ")}`)
    }

    return resultMessage
  }
}
