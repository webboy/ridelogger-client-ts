import { AxiosRequestConfig } from 'axios';
interface validResponse {
    status: string;
    response_time: number;
    data: string;
}
interface invalidResponse {
    status: string;
    message: string;
    errors: [];
    response_time: number;
}
declare abstract class RideLoggerClient {
    private axiosInstance;
    private clientName;
    private version;
    constructor(apiKey?: string | undefined, baseURL?: string);
    consoleLog(message: string): void;
    consoleError(message: string, context?: any): void;
    private handleResponse;
    private handleError;
    makeRequest(config: AxiosRequestConfig): Promise<validResponse | invalidResponse>;
}
export { RideLoggerClient, validResponse, invalidResponse };
