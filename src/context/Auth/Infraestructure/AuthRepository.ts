import axios from "axios";
import { IAuthRepository } from "../Domain/IAuthRepository";

export class AuthRepository implements IAuthRepository{
    private api: any;
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`
        })
    }
    async login (email: string, password: string) {
        const { data } = await this.api.post('/users/auth', {
            email,
            password
        })

        return data;    
    }

    async registration (email: string, password: string, name: string) {
        const { data } = await this.api.post('/users', {
            email,
            password,
            name
        })

        return data;    
    }
}