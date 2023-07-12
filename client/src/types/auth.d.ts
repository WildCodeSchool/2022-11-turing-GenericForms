export interface LoginResponse {
   login: {
        success: boolean;
        token: string;
    }
}

export interface CheckTokenResponse {
    checkToken: {
        valid: boolean;
    }
}