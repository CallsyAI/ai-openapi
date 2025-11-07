/**
 * Response from Readme API create api endpoint.
 *
 * Refer to:
 * https://docs.readme.com/main/reference/createapi
 */
export interface CreateApiDefinitionResponse {
  data: {
    upload: {
      status: "pending" | "failed" | "done" | "pending_update" | "failed_update"
    }
    uri: string
  }
}
