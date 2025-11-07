/**
 * Response from Readme API update api endpoint.
 *
 * Refer to:
 * https://docs.readme.com/main/reference/updateapi
 */
export interface UpdateApiDefinitionResponse {
  data: {
    upload: {
      status: "pending" | "failed" | "done" | "pending_update" | "failed_update"
    }
    uri: string
  }
}
