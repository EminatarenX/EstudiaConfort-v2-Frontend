import { IAuthRepository } from "../Domain/IAuthRepository";

export class AuthUser {
    constructor(private readonly authRepository: IAuthRepository) {}

    async run (email: string, password: string) {
        return await this.authRepository.login(email, password);
    }
}