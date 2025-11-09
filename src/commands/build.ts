import * as fs from "fs"
import {JsonDict} from "../util/types"
import {listAllFilesInDirectory, readJsonFile} from "../util/fs"
import {Options} from "../options"
import Config from "../config"

export default async function build(options: Partial<Options> = {}) {
    const cfg = new Config(options)

    console.log("Building OpenAPI specification...")

    const spec = buildOpenApiSpec()
    fs.writeFileSync(cfg.fullDocFilePath(), JSON.stringify(spec, null, 2), "utf-8")

    console.log("OpenAPI specification successfully built!")

    function buildOpenApiSpec(): JsonDict {
        const baseSpec = readJsonFile<any>(cfg.baseFilePath())

        const schemaFiles = listAllFilesInDirectory(cfg.schemasDir(), ".json")
        for (const schemaFile of schemaFiles) {
            const schemas = readJsonFile(schemaFile)
            Object.assign(baseSpec.components.schemas, schemas)
        }

        const routeFiles = listAllFilesInDirectory(cfg.routesDir(), ".json")
        for (const routeFile of routeFiles) {
            const routes = readJsonFile(routeFile)
            Object.assign(baseSpec.paths, routes)
        }

        return baseSpec
    }
}
