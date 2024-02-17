import axios from "axios";
import { IAuthRepository } from "../Domain/IAuthRepository";
import { LOGIN_QUERY, GET_ALL_ROOMS_QUERY } from "./graphql/AuthQueries";

export class AuthRepository implements IAuthRepository{
    private api: any;
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/graphql`
        })
    }
    async login (email: string, password: string) {
        const { data } = await this.api.post('/', LOGIN_QUERY(email, password))
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

    async getAllRooms(token: string): Promise<any> {
        if(!token) return
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type" : "application/json"
            }
        }
        const { data } = await this.api.post('/', GET_ALL_ROOMS_QUERY(), config ) 
        return data
    }
}