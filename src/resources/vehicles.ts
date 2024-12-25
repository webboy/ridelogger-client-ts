import { RideLoggerClient } from "../client";

export class RLVehicle extends RideLoggerClient {

    public async getList(): Promise<any> {
        this.consoleLog("Fetching vehicles");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/vehicles',
            });
        } catch (error) {
            this.consoleError("Error fetching vehicles", error);
            throw error;
        }
    }
}