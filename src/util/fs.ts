import fs from "fs"
import path from "path"
import FileNotFound from "../errors/fileNotFound"

/**
 * Returns a complete list of the files in a given directory.
 */
export function listAllFilesInDirectory(dir: string, extension?: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(file =>
      file.isFile() && (extension ? file.name.endsWith(extension) : true)
    ).map(file => path.join(dir, file.name))
}

/**
 * Reads a file and parses its contents as JSON.
 */
export function readJsonFile<T>(fPath: string): T {
  return JSON.parse(readFile(fPath)) as T
}

/**
 * Reads from a file.
 */
export function readFile(fPath: string): string {
  const filePath = path.resolve(fPath)

  if (!fs.existsSync(filePath)) {
    throw new FileNotFound(`File not found: ${filePath}`)
  }

  return fs.readFileSync(filePath, "utf-8")
}
