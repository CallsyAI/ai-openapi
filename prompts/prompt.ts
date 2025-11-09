import * as path from "path"
import {readFile} from "../src/util/fs"
import {build} from "../src/util/handlebars"
import Config from "../src/config"

/**
 * Returns complete prompt.
 */
export default function prompt(cfg: Config): string {
    const promptTemplatePath = path.join(__dirname, "base.txt")
    const promptTemplate = readFile(promptTemplatePath)
    const instructions = readFile(cfg.instructionsPath())

    return build(promptTemplate, {
        ADDITIONAL_INSTRUCTIONS: instructions,
        DOCUMENTATION_SCHEMAS_PATH: cfg.schemasDir(),
        DOCUMENTATION_ROUTES_PATH: cfg.routesDir()
    })
}
