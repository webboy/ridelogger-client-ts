import { RideLoggerClient } from "../client";

export class RLVehicleLog extends RideLoggerClient {

    public async getList(): Promise<any> {
        this.consoleLog("Fetching vehicle logs");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/vehicle_logs',
            });
        } catch (error) {
            this.consoleError("Error fetching vehicle logs", error);
            throw error;
        }
    }
}