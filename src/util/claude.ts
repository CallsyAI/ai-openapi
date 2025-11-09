import {execSync} from "child_process"
import * as fs from "fs"

/**
 * Finds the claude executable path.
 */
export function findClaude(): string {
    try {
        return execSync("which claude", {encoding: "utf-8"}).trim()
    } catch {
        // Fallback to common installation paths.
        const commonPaths = [
            "/opt/homebrew/bin/claude",
            "/usr/local/bin/claude",
            process.env.CLAUDE_CODE_PATH
        ]

        for (const path of commonPaths) {
            if (path && fs.existsSync(path)) {
                return path
            }
        }

        const msg = "Claude executable not found."
        const instruct = "Please install Claude Code or set CLAUDE_CODE_PATH environment variable."
        throw new Error(`${msg} ${instruct}`)
    }
}
