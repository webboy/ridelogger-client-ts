import { RideLoggerClient } from "../client";

export class RLFuelVolumeUnit extends RideLoggerClient {

    public async getList(): Promise<any> {
        this.consoleLog("Fetching fuel volume units");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/fuel_volume_units',
            });
        } catch (error) {
            this.consoleError("Error fetching fuel volume units", error);
            throw error;
        }
    }
}