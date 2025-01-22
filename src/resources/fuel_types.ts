import { RideLoggerClient } from "../client";

export class RLFuelType extends RideLoggerClient {

    public async getList(): Promise<any> {
        this.consoleLog("Fetching fuel types");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/static_data/fuel_types',
            });
        } catch (error) {
            this.consoleError("Error fetching fuel types", error);
            throw error;
        }
    }
}