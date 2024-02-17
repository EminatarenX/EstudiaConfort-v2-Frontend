import { IAuthRepository } from "../Domain/IAuthRepository";

export class GetAllUserRooms {
    constructor(
        private readonly userRepository: IAuthRepository
    ){}
    async run() {
        const token = localStorage.getItem('token')
        if(!token) return
        return await this.userRepository.getAllRooms(token)
    }
}