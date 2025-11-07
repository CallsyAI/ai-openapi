/**
 * Response from Readme API get api endpoint.
 *
 * Refer to:
 * https://docs.readme.com/main/reference/getapi
 */
export interface GetApiDefinitionResponse {
  data: {
    created_at: string
    filename: string
    legacy_id: string | null
    source: {
      current: string
      original: string
      sync_url: string | null
    }
    type: string
    updated_at: string
    upload: {
      status: "pending" | "failed" | "done" | "pending_update" | "failed_update"
      reason: string | null
      warnings: string | null
    }
    uri: string
    schema?: string
  }
}
