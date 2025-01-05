import axios, { AxiosResponse, AxiosRequestHeaders, AxiosRequestConfig } from 'axios';
import { DEFAULT_CONFIG } from './config';


interface validResponse {
    status: string;
    response_time: number;
    data: any;
}

interface invalidResponse {
    status: string;
    message: string;
    errors: Record<string, string[]>,
    response_time: number;
    data: any;
}

abstract class RideLoggerClient {
    private axiosInstance: ReturnType<typeof axios.create>;
    private clientName = 'RideLoggerClient';
    private version = '1.0.0';

    constructor(
        apiKey: string,
        authenticationToken: string = '',
        baseURL: string = DEFAULT_CONFIG.baseURL
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
                'X-API-KEY': apiKey,
                'Authorization': `Bearer ${authenticationToken}`,
            } as unknown as AxiosRequestHeaders,
        });

        // Bind the class methods to the instance
        this.handleResponse = this.handleResponse.bind(this);
        this.handleError = this.handleError.bind(this);

        this.axiosInstance.interceptors.response.use(
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
        return response;
    }

    private handleError(error: Error): Promise<never> {
        this.consoleError("API Error:", error);
        // Rethrow or log the error based on severity
        return Promise.reject(error);
    }

    public async makeRequest(config: AxiosRequestConfig): Promise<validResponse | invalidResponse> {

        if (!config.url) {
            throw new Error("The 'url' property must be provided in the request configuration.");
        }

        try {
            const response = await this.axiosInstance.request(config);

            return {
                status: response.data.status,
                response_time: response.data?.response_time ?? 0,
                data: response.data.data,
                message: response.data?.message ?? '',
            } as validResponse

        } catch (error: any) {
            // Handle failed request (e.g., network error or server issue)
            return {
                status: error.response.data.status ?? 'axios-error',
                response_time: error.response.data?.response_time ?? 0,
                message: error.response.data.message ?? 'Request failed.',
                errors: error.response?.data?.errors ?? [],
            } as invalidResponse;
        }
    }
}

export {
    RideLoggerClient,
    type validResponse,
    type invalidResponse
}
