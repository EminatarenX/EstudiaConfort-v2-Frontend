export interface IAuthRepository {
    login(email: string, password: string) : Promise<any>;
    registration(email: string, password: string, name: string) : Promise<any>;
}