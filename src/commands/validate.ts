import SwaggerParser from "@apidevtools/swagger-parser"
import {Options} from "../options"
import Config from "../config"

export default async function validate(options: Partial<Options> = {}) {
    const cfg = new Config(options)

    console.log("Validating OpenAPI specification...")

    const api = await SwaggerParser.validate(cfg.fullDocFilePath())

    console.log(`OpenAPI specification is valid!`)
    console.log(`API: ${api.info.title} v${api.info.version}.`)
    console.log(`Paths: ${Object.keys(api.paths || {}).length}.`)
}
