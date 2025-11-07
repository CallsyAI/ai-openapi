export interface CliOptions {
    docDir?: string
    applicationExplanation?: string
    endpointGuidance?: string
    additionalConstraints?: string
    anthropicApiKey?: string
    readmeApiKey?: string
    baseFile?: string
}

export function resolveDefaults(options: CliOptions): CliOptions {
    return {
        docDir: options.docDir ?? "./documentation",
        applicationExplanation: options.applicationExplanation ?? "./documentation/applicationExplanation.txt",
        endpointGuidance: options.endpointGuidance ?? "./documentation/endpointGuidance.txt",
        additionalConstraints: options.additionalConstraints ?? "./documentation/additionalConstraints.txt",
        anthropicApiKey: options.anthropicApiKey,
        readmeApiKey: options.readmeApiKey,
        baseFile: options.baseFile ?? "./documentation/base.json"
    }
}
