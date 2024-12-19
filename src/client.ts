import axios from 'axios';
import { AxiosResponse } from 'axios/index';
import AxiosXHRConfig = Axios.AxiosXHRConfig;
import dotenv from 'dotenv'
import { DEFAULT_CONFIG } from './config';
import * as process from "node:process";
dotenv.config();

interface validResponse {
    status: string;
    response_time: number;
    data: string;
}

interface invalidResponse {
    status: string;
    message: string;
    errors: [],
    response_time: number;
}

abstract class RideLoggerClient {
    private axiosInstance: Axios.AxiosInstance;
    private clientName = 'RideLoggerClient';
    private version = '1.0.0';

    constructor(
        apiKey: string | undefined = process.env.API_KEY,
        baseURL: string = process.env.RIDE_LOGGER_API_URL || DEFAULT_CONFIG.baseURL
    ) {
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
                'X-API-KEY': apiKey
            },
        });

        // Bind the class methods to the instance
        this.handleResponse = this.handleResponse.bind(this);
        this.handleError = this.handleError.bind(this);


        this.axiosInstance.interceptors.response.use(
            // @ts-ignore
            this.handleResponse,
            this.handleError
        );
    }

    public consoleLog(message: string) {
        console.log(`${this.clientName}(${this.version}): ${message}`);
    }

    public consoleError(message: string, context?: any) {
        console.error(`${this.clientName}(${this.version}): ${message}`, context);
    }

    private handleResponse(response: AxiosResponse<any>): AxiosResponse<any> {
        if (response.status >= 400) {
            this.consoleError(`${response.status} - ${response.statusText}`);
            // Handle specific error cases based on status code
        }
        return response;
    }

    private handleError(error: Error): Promise<never> {
        this.consoleError("API Error:", error);
        // Rethrow or log the error based on severity
        return Promise.reject(error);
    }

    public async makeRequest(config: AxiosXHRConfig<any>): Promise<validResponse | invalidResponse> {
        try {
            const response = await this.axiosInstance.request(config);

            // Parse the response based on the "status" field
            if (response.data?.status === 'success') {
                return {
                    status: 'success',
                    response_time: response.data.response_time,
                    data: response.data.data ?? '',
                } as validResponse;
            } else {
                return {
                    status: 'error',
                    response_time: response.data?.response_time ?? 0,
                    message: response.data?.message ?? 'Unknown error occurred.',
                    errors: response.data?.errors ?? [],
                } as invalidResponse;
            }
        } catch (error: any) {
            // Handle failed request (e.g., network error or server issue)
            this.consoleError("Request failed", error);

            return {
                status: 'error',
                response_time: 0, // Default to 0 if the request doesn't return a valid response_time
                message: error.message ?? 'Request failed.',
                errors: error.response?.data?.errors ?? [],
            } as invalidResponse;
        }
    }
}

export {
    RideLoggerClient,
    validResponse,
    invalidResponse
}