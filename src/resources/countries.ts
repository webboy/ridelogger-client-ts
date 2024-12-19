import { RideLoggerClient } from "@/client";
import { DEFAULT_CONFIG } from "@/config";

export class RLCountries extends RideLoggerClient {
    constructor(
        baseURL: string = process.env.BASE_URL || DEFAULT_CONFIG.baseURL,
        apiKey: string = process.env.API_KEY || DEFAULT_CONFIG.apiKey
    ) {
        super({ baseURL, apiKey });
    }

    public async getCountries(): Promise<any> {
        this.consoleLog("Fetching countries");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/countries',
            });
        } catch (error) {
            this.consoleError("Error fetching countries", error);
            throw error;
        }
    }
}