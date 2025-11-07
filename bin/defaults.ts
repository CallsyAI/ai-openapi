export interface CliOptions {
    docDir?: string
    additionalInstructions?: string
    baseFile?: string
    anthropicApiKey?: string
    readmeApiKey?: string
}

export function resolveDefaults(options: CliOptions): CliOptions {
    return {
        docDir: options.docDir ?? "./documentation",
        additionalInstructions: options.additionalInstructions ?? "./documentation/additionalInstructions.txt",
        baseFile: options.baseFile ?? "./documentation/base.json",
        anthropicApiKey: options.anthropicApiKey,
        readmeApiKey: options.readmeApiKey
    }
}
