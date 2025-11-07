import * as path from "path"
import SwaggerParser from "@apidevtools/swagger-parser"
import {CliOptions, resolveDefaults} from "../bin/defaults"

export default async function validate(options: CliOptions = {}) {
    const opts = resolveDefaults(options)

    const docDir = path.resolve(opts.docDir!)
    const openapiFile = path.join(docDir, "openapi.json")

    console.log("Validating OpenAPI specification...")

    const api = await SwaggerParser.validate(openapiFile)

    console.log(`OpenAPI specification is valid!`)
    console.log(`API: ${api.info.title} v${api.info.version}.`)
    console.log(`Paths: ${Object.keys(api.paths || {}).length}.`)
}
