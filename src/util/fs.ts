import fs from "fs"
import path from "path"

/**
 * Returns a complete list of the files in a given directory.
 */
export function listAllFilesInDirectory(dir: string, extension?: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(file =>
      file.isFile() && (extension ? file.name.endsWith(extension) : true)
    )
    .map(file => path.join(dir, file.name))
}

/**
 * Reads a file and parses its contents as JSON.
 */
export function readJsonFile<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(content) as T
}
