import * as fs from "fs"
import {JsonDict} from "../util/types"
import ReadmeIntegration from "../integrations/readmeIntegration"
import {Options} from "../options"
import Config from "../config"

export default async function deploy(options: Partial<Options> = {}) {
    const cfg = new Config(options)

    console.log("Deploying OpenAPI specification to ReadmeIntegration...")

    if (!fs.existsSync(cfg.fullDocFilePath())) {
        console.error(`OpenAPI spec not found: ${cfg.fullDocFilePath()}.`)
        process.exit(1)
    }

    const specContent = fs.readFileSync(cfg.fullDocFilePath(), "utf-8")
    const spec: JsonDict = JSON.parse(specContent)
    const api = new ReadmeIntegration(cfg.readmeApiKey())
    const result = await api.createOrUpdateApiDefinition(spec)

    console.log(`Successfully deployed OpenAPI spec to Readme:\n${JSON.stringify(result, null, 2)}.`)
}
