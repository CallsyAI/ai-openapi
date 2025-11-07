import ApiReadmeBase from "./apiReadmeBase"
import {JsonDict} from "../../util/types"
import {CreateApiDefinitionResponse} from "./types/createApiDefinitionResponse"
import {UpdateApiDefinitionResponse} from "./types/updateApiDefinitionResponse"
import {GetApiDefinitionResponse} from "./types/getApiDefinitionResponse"
import FormData from "form-data"

export default class ApiReadme extends ApiReadmeBase {
  public constructor(
    options?: {
      branch?: string
      filename?: string
      apiKey?: string
    }
  ) {
    super(options?.apiKey)
    this.branch = options?.branch ?? "stable"
    this.filename = options?.filename ?? "spec.json"
  }

  private readonly branch: string
  private readonly filename: string

  /**
   * Create a new API specification in ReadMe.
   * Endpoint: POST https://api.readme.com/v2/branches/{branch}/apis.
   */
  public async createApiDefinition(spec: JsonDict): Promise<CreateApiDefinitionResponse> {
    const formData = this.buildFormData(spec)
    const endpoint = `/branches/${this.branch}/apis`
    const config = {headers: formData.getHeaders()}
    const response = await this.axiosInstance.post<CreateApiDefinitionResponse>(endpoint, formData, config)
    return response.data
  }

  /**
   * Update an existing API specification in ReadMe.
   * Endpoint: PUT https://api.readme.com/v2/branches/{branch}/apis/{filename}.
   */
  public async updateApiDefinition(spec: JsonDict): Promise<UpdateApiDefinitionResponse> {
    const formData = this.buildFormData(spec)
    const endpoint = `/branches/${this.branch}/apis/${this.filename}`
    const config = {headers: formData.getHeaders()}
    const response = await this.axiosInstance.put<UpdateApiDefinitionResponse>(endpoint, formData, config)
    return response.data
  }

  /**
   * Get an API definition from Readme.
   * Endpoint: GET https://api.readme.com/v2/branches/{branch}/apis/{filename}.
   */
  public async getApiDefinition(): Promise<GetApiDefinitionResponse> {
    const endpoint = `/branches/${this.branch}/apis/${this.filename}`
    const response = await this.axiosInstance.get<GetApiDefinitionResponse>(endpoint)
    return response.data
  }

  /**
   * Create or update an API specification in ReadMe.
   * Tries to update first; if 404, creates new specification.
   */
  public async createOrUpdateApiDefinition(spec: JsonDict): Promise<CreateApiDefinitionResponse | UpdateApiDefinitionResponse> {
    try {
      return await this.updateApiDefinition(spec)
    } catch (error: any) {
      if (error?.response?.status === 404) {
        return await this.createApiDefinition(spec)
      }
      throw error
    }
  }

  /**
   * Builds form data to be used in http requests when creating or updating API definitions.
   */
  private buildFormData(spec: JsonDict): FormData {
    const formData = new FormData()
    const options = {filename: this.filename, contentType: 'application/json'}
    formData.append('schema', JSON.stringify(spec, null, 2), options)
    return formData
  }
}
