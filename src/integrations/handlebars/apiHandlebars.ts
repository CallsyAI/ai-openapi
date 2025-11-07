import Handlebars from "handlebars"

export default class HandlebarsService {
    /**
     * Builds a complete string from a given template and dynamic variables.
     */
    public static build(template: string, templateVars: Record<string, any>): string {
        const handlebarsTemplate = Handlebars.compile(template, {noEscape: true})
        return handlebarsTemplate(templateVars)
    }

    /**
     * Validates existing template for syntax errors.
     */
    public static validate(template: string) {
        Handlebars.parse(template)
    }

    public static isValid(template: string): boolean {
        try {
            HandlebarsService.validate(template)
            return true
        } catch (error: any) {
            return false
        }
    }
}
