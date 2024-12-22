import axios from 'axios';
import dotenv from 'dotenv';
import * as process from 'node:process';

const DEFAULT_CONFIG = {
    baseURL: 'http://localhost:8000',
    apiKey: null, // Replace this with your actual API key, if any
};

dotenv.config();
class RideLoggerClient {
    constructor(apiKey = process.env.API_KEY, baseURL = process.env.RIDE_LOGGER_API_URL || DEFAULT_CONFIG.baseURL) {
        this.clientName = 'RideLoggerClient';
        this.version = '1.0.0';
        if (!apiKey) {
            throw new Error("API key is required.");
        }
        if (new.target === RideLoggerClient) {
            throw new Error("RideLoggerClient is an abstract class and cannot be instantiated directly.");
        }
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey,
            },
        });
        // Bind the class methods to the instance
        this.handleResponse = this.handleResponse.bind(this);
        this.handleError = this.handleError.bind(this);
        this.axiosInstance.interceptors.response.use(this.handleResponse, this.handleError);
    }
    consoleLog(message) {
        console.log(`${this.clientName}(${this.version}): ${message}`);
    }
    consoleError(message, context) {
        console.error(`${this.clientName}(${this.version}): ${message}`, context);
    }
    handleResponse(response) {
        if (response.status >= 400) {
            this.consoleError(`${response.status} - ${response.statusText}`);
            // Handle specific error cases based on status code
        }
        return response;
    }
    handleError(error) {
        this.consoleError("API Error:", error);
        // Rethrow or log the error based on severity
        return Promise.reject(error);
    }
    async makeRequest(config) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (!config.url) {
            throw new Error("The 'url' property must be provided in the request configuration.");
        }
        try {
            const response = await this.axiosInstance.request(config);
            // Parse the response based on the "status" field
            if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.status) === 'success') {
                return {
                    status: 'success',
                    response_time: response.data.response_time,
                    data: (_b = response.data.data) !== null && _b !== void 0 ? _b : '',
                };
            }
            else {
                return {
                    status: 'error',
                    response_time: (_d = (_c = response.data) === null || _c === void 0 ? void 0 : _c.response_time) !== null && _d !== void 0 ? _d : 0,
                    message: (_f = (_e = response.data) === null || _e === void 0 ? void 0 : _e.message) !== null && _f !== void 0 ? _f : 'Unknown error occurred.',
                    errors: (_h = (_g = response.data) === null || _g === void 0 ? void 0 : _g.errors) !== null && _h !== void 0 ? _h : [],
                };
            }
        }
        catch (error) {
            // Handle failed request (e.g., network error or server issue)
            return {
                status: 'axios_error',
                response_time: 0, // Default to 0 if the request doesn't return a valid response_time
                message: (_j = error.message) !== null && _j !== void 0 ? _j : 'Request failed.',
                errors: (_m = (_l = (_k = error.response) === null || _k === void 0 ? void 0 : _k.data) === null || _l === void 0 ? void 0 : _l.errors) !== null && _m !== void 0 ? _m : [],
            };
        }
    }
}

class RLCountry extends RideLoggerClient {
    async getCountries() {
        this.consoleLog("Fetching countries");
        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/countries',
            });
        }
        catch (error) {
            this.consoleError("Error fetching countries", error);
            throw error;
        }
    }
}

class RLCurrency extends RideLoggerClient {
    async getCurrencies() {
        this.consoleLog("Fetching currencies");
        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/currencies',
            });
        }
        catch (error) {
            this.consoleError("Error fetching currencies", error);
            throw error;
        }
    }
}

class RLVehicleMake extends RideLoggerClient {
    async getVehicleMakes() {
        this.consoleLog("Fetching vehicle makes");
        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/vehicle_makes',
            });
        }
        catch (error) {
            this.consoleError("Error fetching vehicle makes", error);
            throw error;
        }
    }
}

class RLVehicleModel extends RideLoggerClient {
    async getVehicleModels(vehicleMakeId, vehicleTypeId) {
        this.consoleLog("Fetching vehicle models");
        try {
            // Build the query parameters based on the provided arguments
            const queryParams = [];
            if (vehicleMakeId)
                queryParams.push(`vehicle_make_id=${encodeURIComponent(vehicleMakeId)}`);
            if (vehicleTypeId)
                queryParams.push(`vehicle_type_id=${encodeURIComponent(vehicleTypeId)}`);
            // Construct the URL with query parameters if any
            const url = queryParams.length > 0
                ? `/vehicle_models?${queryParams.join("&")}`
                : '/vehicle_models';
            // Make the request
            return await this.makeRequest({
                method: 'GET',
                url,
            });
        }
        catch (error) {
            this.consoleError("Error fetching vehicle models", error);
            throw error;
        }
    }
}

class RLSystem extends RideLoggerClient {
    async getVersion() {
        this.consoleLog("Fetching version");
        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/',
            });
        }
        catch (error) {
            this.consoleError("Error fetching version", error);
            throw error;
        }
    }
    async getFuelConsumptionUnits() {
        this.consoleLog("Fetching fuel consumption units");
        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/fuel_consumption_units',
            });
        }
        catch (error) {
            this.consoleError("Error fetching fuel consumption units", error);
            throw error;
        }
    }
    async getMileageUnits() {
        this.consoleLog("Fetching mileage units");
        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/mileage_units',
            });
        }
        catch (error) {
            this.consoleError("Error fetching mileage units", error);
            throw error;
        }
    }
    async getFuelTypes() {
        this.consoleLog("Fetching fuel types");
        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/fuel_types',
            });
        }
        catch (error) {
            this.consoleError("Error fetching fuel types", error);
            throw error;
        }
    }
    async getVehicleTypes() {
        this.consoleLog("Fetching vehicle types");
        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/vehicle_types',
            });
        }
        catch (error) {
            this.consoleError("Error fetching vehicle types", error);
            throw error;
        }
    }
}

export { RLCountry, RLCurrency, RLSystem, RLVehicleMake, RLVehicleModel, RideLoggerClient };
//# sourceMappingURL=index.esm.js.map
