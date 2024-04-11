import { IAuthRepository } from "../Domain/IAuthRepository";

export class EditRoomUseCase {
    constructor(private readonly authRepository: IAuthRepository) {}

    async run (token: string,payload: { name: string, roomId: string, topic: string, topic_salida: string}) {
        return await this.authRepository.editRoom(token, payload);
    }
}