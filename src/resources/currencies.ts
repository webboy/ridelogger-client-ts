import { RideLoggerClient } from "../client";

export class RLCurrency extends RideLoggerClient {

    public async getList(): Promise<any> {
        this.consoleLog("Fetching currencies");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/currencies',
            });
        } catch (error) {
            this.consoleError("Error fetching currencies", error);
            throw error;
        }
    }
}