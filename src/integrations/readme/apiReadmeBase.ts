import axios, {AxiosInstance, CreateAxiosDefaults} from "axios"
import {must} from "../../util/must"

export default abstract class ApiReadmeBase {
    private readonly README_API_KEY: string
    private readonly BASE_URL = 'https://api.readme.com/v2'
    protected readonly axiosInstance: AxiosInstance

    protected constructor(apiKey?: string) {
        this.README_API_KEY = apiKey || must(process.env.README_API_KEY, "README_API_KEY")

        const axiosDefaults: CreateAxiosDefaults = {
            baseURL: this.BASE_URL,
            headers: {
                'Authorization': `Bearer ${this.README_API_KEY}`,
                'Accept': 'application/json'
            }
        }

        this.axiosInstance = axios.create(axiosDefaults)
    }
}
