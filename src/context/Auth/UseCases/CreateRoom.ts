import { IAuthRepository } from "../Domain/IAuthRepository";

export class CreateRoom {
    constructor(private repository: IAuthRepository) {}

    async run(token: string, payload: { name: string, topic: string, topic_salida: string }) {
        return await this.repository.createRoom(token, payload);
    }
}