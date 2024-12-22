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

    public async getFuelConsumptionUnits(): Promise<any> {
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

    public async getMileageUnits(): Promise<any> {
        this.consoleLog("Fetching mileage units");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/mileage_units',
            });
        } catch (error) {
            this.consoleError("Error fetching mileage units", error);
            throw error;
        }
    }

    public async getFuelTypes(): Promise<any> {
        this.consoleLog("Fetching fuel types");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/fuel_types',
            });
        } catch (error) {
            this.consoleError("Error fetching fuel types", error);
            throw error;
        }
    }

    public async getVehicleTypes(): Promise<any> {
        this.consoleLog("Fetching vehicle types");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/vehicle_types',
            });
        } catch (error) {
            this.consoleError("Error fetching vehicle types", error);
            throw error;
        }
    }
}