import { IAuthRepository } from "../Domain/IAuthRepository";

export class GetRoom {
    constructor(
        private readonly userRepository: IAuthRepository
    ){}
    async run(id: string) {
        const token = localStorage.getItem('token')
        if(!token) return
        return await this.userRepository.getRoom(token, id)
    }
}