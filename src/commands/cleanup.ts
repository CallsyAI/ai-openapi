import * as fs from "fs"
import {Options} from "../options"
import Config from "../config"

export default async function cleanup(options: Partial<Options> = {}) {
    const cfg = new Config(options)

    console.log("Cleaning up auto-generated OpenAPI specification...")

    if (!fs.existsSync(cfg.fullDocFilePath())) {
        console.log(`OpenAPI spec does not exist: ${cfg.fullDocFilePath()}.`)
        process.exit(0)
    }

    fs.unlinkSync(cfg.fullDocFilePath())

    console.log("OpenAPI specification successfully cleaned up!")
}
