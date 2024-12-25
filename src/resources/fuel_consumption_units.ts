import { RideLoggerClient } from "../client";

export class RLFuelConsumptionUnit extends RideLoggerClient {

    public async getList(): Promise<any> {
        this.consoleLog("Fetching fuel consumption units");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/fuel_consumption_units',
            });
        } catch (error) {
            this.consoleError("Error fetching fuel consumption units", error);
            throw error;
        }
    }
}