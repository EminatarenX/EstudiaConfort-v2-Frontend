import { IAuthRepository } from "../Domain/IAuthRepository";

export class Registration {
    constructor(private readonly authRepository: IAuthRepository) {}
    async run(email: string, password: string, name: string) {
        return await this.authRepository.registration(email, password, name);
    }
}