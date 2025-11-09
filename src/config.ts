import {must} from "./util/must"
import path from "path"
import {Options} from "./options"

/**
 * Config for the @callsy/ai-openai tool.
 */
export default class Config {
    public constructor(private readonly options: Partial<Options> = {}) {
    }

    /**
     * Resolves a path where a documentation should be located.
     */
    public docDir(): string {
        return path.resolve(this.options.docDir ?? "./documentation")
    }

    /**
     * Resolves a documentation directory where schemas openapi documentation is generated.
     */
    public schemasDir(): string {
        return `${this.docDir()}/schemas/`
    }

    /**
     * Resolves a documentation directory where routes openapi documentation is generated.
     */
    public routesDir(): string {
        return `${this.docDir()}/routes/`
    }

    /**
     * Resolves a path to additional AI instructions used in a prompt.
     */
    public instructionsPath(): string {
        return `${this.docDir()}/instructions.txt`
    }

    /**
     * Resolves a path to a base openapi file.
     */
    public baseFilePath(): string {
        return `${this.docDir()}/base.json`
    }

    /**
     * Resolves a path to a full openapi documentation file.
     */
    public fullDocFilePath(): string {
        return `${this.docDir()}/openapi.json`
    }

    /**
     * Resolves Anthropic API key.
     */
    public anthropicApiKey(): string {
        return this.options.anthropicApiKey || must(process.env.ANTHROPIC_API_KEY, "ANTHROPIC_API_KEY")
    }

    /**
     * Resolves ReadMe API key
     */
    public readmeApiKey(): string {
        return this.options.readmeApiKey || must(process.env.README_API_KEY, "README_API_KEY")
    }
}
