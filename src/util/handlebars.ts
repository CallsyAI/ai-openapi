import Handlebars from "handlebars"

/**
 * Builds a complete string from a given template and dynamic variables.
 */
export function build(template: string, templateVars: Record<string, any>): string {
    const handlebarsTemplate = Handlebars.compile(template, {noEscape: true})
    return handlebarsTemplate(templateVars)
}

/**
 * Validates existing template for syntax errors.
 */
export function validate(template: string) {
    Handlebars.parse(template)
}

/**
 * Tells if template is valid.
 */
export function isValid(template: string): boolean {
    try {
        validate(template)
        return true
    } catch (error: any) {
        return false
    }
}
