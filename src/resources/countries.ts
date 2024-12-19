import { RideLoggerClient } from "@/client";

export class RLCountries extends RideLoggerClient {

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