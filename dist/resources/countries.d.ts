import { RideLoggerClient } from "../client";
declare class RLCountry extends RideLoggerClient {
    getCountries(): Promise<any>;
}
export { RLCountry };
