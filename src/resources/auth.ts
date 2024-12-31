import { RideLoggerClient } from "../client";

export class RLAuth extends RideLoggerClient {

    public async login(email: string, password: string): Promise<any> {
        this.consoleLog("Authenticating user");

        try {
            return await this.makeRequest({
                method: 'POST',
                url: '/auth/login',
                data: {
                    email,
                    password,
                }
            });
        } catch (error) {
            this.consoleError("Error authenticating user", error);
            throw error;
        }
    }

    public async logout(): Promise<any> {
        this.consoleLog("Logging out user");

        try {
            return await this.makeRequest({
                method: 'GET',
                url: '/auth/logout',
            });
        } catch (error) {
            this.consoleError("Error logging out user", error);
            throw error;
        }
    }
}