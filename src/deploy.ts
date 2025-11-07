import "dotenv/config"
import * as fs from "fs"
import * as path from "path"
import {JsonDict} from "./util/types"
import ApiReadme from "./integrations/readme/apiReadme"
import {CliOptions, resolveDefaults} from "../bin/defaults"

export default async function deploy(options: CliOptions = {}) {
  const opts = resolveDefaults(options)
  const docDir = path.resolve(opts.docDir!)
  const openapiFile = path.join(docDir, "openapi.json")

  console.log("Deploying OpenAPI specification to Readme...")

  if (!fs.existsSync(openapiFile)) {
    console.error(`OpenAPI spec not found: ${openapiFile}.`)
    process.exit(1)
  }

  const specContent = fs.readFileSync(openapiFile, "utf-8")
  const spec: JsonDict = JSON.parse(specContent)
  const api = new ApiReadme({ apiKey: opts.readmeApiKey })
  const result = await api.updateApiDefinition(spec)

  console.log(`Successfully deployed OpenAPI spec to Readme:\n${JSON.stringify(result, null, 2)}.`)
}
