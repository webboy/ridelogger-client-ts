import { RideLoggerClient } from "../client";

export class RLMileageUnit extends RideLoggerClient {

    public async getList(): Promise<any> {
        this.consoleLog("Fetching mileage units");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/fuel_mileage_units',
            });
        } catch (error) {
            this.consoleError("Error fetching mileage units", error);
            throw error;
        }
    }
}