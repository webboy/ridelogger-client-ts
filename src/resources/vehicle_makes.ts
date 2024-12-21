import { RideLoggerClient } from "@/client";

export class RLVehicleMake extends RideLoggerClient {

    public async getVehicleMakes(): Promise<any> {
        this.consoleLog("Fetching vehicle makes");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/vehicle_makes',
            });
        } catch (error) {
            this.consoleError("Error fetching vehicle makes", error);
            throw error;
        }
    }
}