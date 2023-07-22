export interface User{
    name: string;
    description: string;
    role: string;
    email: string;
    cityId: string;
    imageUrl: string;
    subscriptionStatus: string;
}

export interface Login {
    token: string;
    user: User;
}

export interface LoginResponse {
    data: Login;
}