import { RideLoggerClient } from "../client";

export class RLSystem extends RideLoggerClient {

    public async getVersion(): Promise<any> {
        this.consoleLog("Fetching version");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/',
            });
        } catch (error) {
            this.consoleError("Error fetching version", error);
            throw error;
        }
    }
}