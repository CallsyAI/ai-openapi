import * as path from "path"
import HandlebarsService from "../src/integrations/handlebars/apiHandlebars"
import {readFile} from "../src/util/fs"

interface PromptProps {
    instructionsPath: string
}

/**
 * Returns complete prompt.
 */
export default function prompt(props: PromptProps): string {
    const templatePath = path.join(__dirname, "base.txt")
    const template = readFile(templatePath)
    const instructions = readFile(props.instructionsPath)

    return HandlebarsService.build(template, {
        ADDITIONAL_INSTRUCTIONS: instructions
    })
}
