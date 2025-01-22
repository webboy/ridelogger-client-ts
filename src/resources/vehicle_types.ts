import { RideLoggerClient } from "../client";

export class RLVehicleType extends RideLoggerClient {

    public async getList(): Promise<any> {
        this.consoleLog("Fetching vehicle types");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/static_data/vehicle_types',
            });
        } catch (error) {
            this.consoleError("Error fetching vehicle types", error);
            throw error;
        }
    }
}