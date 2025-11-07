import * as fs from "fs"
import * as path from "path"
import {JsonDict} from "./util/types"
import {listAllFilesInDirectory, readJsonFile} from "./util/fs"
import {CliOptions, resolveDefaults} from "../bin/defaults"

export default async function build(options: CliOptions = {}) {
  const opts = resolveDefaults(options)
  const docDir = path.resolve(opts.docDir!)
  const routesDir = path.join(docDir, "routes")
  const schemasDir = path.join(docDir, "schemas")
  const outputFile = path.join(docDir, "openapi.json")
  const baseFile = path.resolve(opts.baseFile!)

  console.log("Building OpenAPI specification...")

  const spec = buildOpenApiSpec()
  fs.writeFileSync(outputFile, JSON.stringify(spec, null, 2), "utf-8")

  console.log("OpenAPI specification successfully built!")

  function buildOpenApiSpec(): JsonDict {
    const baseSpec = readJsonFile<any>(baseFile)

    const schemaFiles = listAllFilesInDirectory(schemasDir, ".json")
    for (const schemaFile of schemaFiles) {
      const schemas = readJsonFile(schemaFile)
      Object.assign(baseSpec.components.schemas, schemas)
    }

    const routeFiles = listAllFilesInDirectory(routesDir, ".json")
    for (const routeFile of routeFiles) {
      const routes = readJsonFile(routeFile)
      Object.assign(baseSpec.paths, routes)
    }

    return baseSpec
  }
}
