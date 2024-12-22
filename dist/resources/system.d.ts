import { RideLoggerClient } from "../client";
export declare class RLSystem extends RideLoggerClient {
    getVersion(): Promise<any>;
    getFuelConsumptionUnits(): Promise<any>;
    getMileageUnits(): Promise<any>;
    getFuelTypes(): Promise<any>;
    getVehicleTypes(): Promise<any>;
}
