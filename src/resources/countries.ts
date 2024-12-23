import { RideLoggerClient } from "../client";

class RLCountry extends RideLoggerClient {

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

export {
    RLCountry
}