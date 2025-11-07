import * as fs from "fs"
import * as path from "path"
import {fileURLToPath} from "url"
import HandlebarsService from "../src/integrations/handlebars/apiHandlebars"

interface Input {
    // If you pass `file`, make sure the content is path to a file.
    // If you pass `text` make sure it is a normal text.
    type: "file" | "text"
    // Contents based on the type.
    content: string
}

interface PromptProps {
    // Use this input to explain to AI what is your application.
    APPLICATION_EXPLANATION: Input
    // Use this input to explain to AI how to figure out what
    // endpoints to document and where to find them.
    ENDPOINT_GUIDANCE: Input
    // Use this input to add any additional constraints for AI.
    ADDITIONAL_CONSTRAINTS: Input
}

/**
 * Returns complete prompt.
 */
export default function prompt(props: PromptProps): string {
    // 1. Read prompt.
    const templatePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "base.txt")
    const template = fs.readFileSync(templatePath, "utf-8")

    // 2. If it's file, verify and read. If it's text, just use it.
    const vars: Record<string, string> = {}
    for (const [key, input] of Object.entries(props)) {
        vars[key] = resolveInput(input)
    }

    // 3. Use handlebars to compile and return completed prompt.
    return HandlebarsService.build(template, vars)
}

/**
 * Resolves input and returns resolved contents.
 */
function resolveInput(input: Input): string {
    if (input.type === "file") {
        const filePath = path.resolve(input.content)
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`)
        }
        return fs.readFileSync(filePath, "utf-8")
    }

    return input.content
}
