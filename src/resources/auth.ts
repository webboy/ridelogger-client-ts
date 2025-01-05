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

    public async register(email: string, password: string, password_confirmation: string, country_id: string): Promise<any> {
        this.consoleLog("Registering user");

        try {
            return await this.makeRequest({
                method: 'POST',
                url: '/auth/signup',
                data: {
                    email,
                    password,
                    password_confirmation,
                    country_id,
                }
            });
        } catch (error) {
            this.consoleError("Error registering user", error);
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

    public async requestEmailVerification() {
        this.consoleLog("Requesting email verification");
        try {
            return await this.makeRequest({
                method: 'POST',
                url: '/auth/email_verification_send',
            });
        } catch (error) {
            this.consoleError("Error requesting email verification", error);
            throw error;
        }
    }

    public async verifyEmail(email: string, email_verification_code: string){
        this.consoleLog("Verifying email");
        try {
            return await this.makeRequest({
                method: 'POST',
                url: '/auth/email_verification',
                data:{
                    email,
                    email_verification_code
                }
            });
        } catch (error) {
            this.consoleError("Error verifying email", error);
            throw error;
        }
    }
}