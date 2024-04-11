import { IAuthRepository } from "../Domain/IAuthRepository";
export class DeleteRoom {
    constructor(private readonly authRepository: IAuthRepository) {}

    async run (token: string, roomId: string) {
        return await this.authRepository.deleteRoom(token, roomId);
    }
}