import * as fs from "fs"
import * as path from "path"
import {CliOptions, resolveDefaults} from "../bin/defaults"

export default async function cleanup(options: CliOptions = {}) {
  const opts = resolveDefaults(options)
  const docDir = path.resolve(opts.docDir!)
  const openapiFile = path.join(docDir, "openapi.json")

  console.log("Cleaning up auto-generated OpenAPI specification...")

  if (!fs.existsSync(openapiFile)) {
    console.log(`OpenAPI spec does not exist: ${openapiFile}.`)
    process.exit(0)
  }

  fs.unlinkSync(openapiFile)

  console.log("OpenAPI specification successfully cleaned up!")
}
