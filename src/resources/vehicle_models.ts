import { RideLoggerClient } from "../client";

export class RLVehicleModel extends RideLoggerClient {

    public async getList(vehicleMakeId?: number, vehicleTypeId?: number): Promise<any> {
        this.consoleLog("Fetching vehicle models");

        try {
            // Build the query parameters based on the provided arguments
            const queryParams: string[] = [];
            if (vehicleMakeId) queryParams.push(`vehicle_make_id=${encodeURIComponent(vehicleMakeId)}`);
            if (vehicleTypeId) queryParams.push(`vehicle_type_id=${encodeURIComponent(vehicleTypeId)}`);

            // Construct the URL with query parameters if any
            const url = queryParams.length > 0
                ? `/vehicle_models?${queryParams.join("&")}`
                : '/vehicle_models';

            // Make the request
            return await this.makeRequest({
                method: 'GET',
                url,
            });
        } catch (error) {
            this.consoleError("Error fetching vehicle models", error);
            throw error;
        }
    }
}