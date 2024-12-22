import { RideLoggerClient } from "../client";
export declare class RLVehicleModel extends RideLoggerClient {
    getVehicleModels(vehicleMakeId?: number, vehicleTypeId?: number): Promise<any>;
}
