import { RideLoggerClient } from "../client";

export class RLMeasurements extends RideLoggerClient {

    public async getList(): Promise<any> {
        this.consoleLog("Fetching measurements");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/measurements',
            });
        } catch (error) {
            this.consoleError("Error fetching measurements", error);
            throw error;
        }
    }

    public async getMeasurement(measurement: string | number): Promise<any> {
        this.consoleLog("Fetching measurement");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/measurements/' + measurement,
            });
        } catch (error) {
            this.consoleError("Error fetching measurement", error);
            throw error;
        }
    }
}