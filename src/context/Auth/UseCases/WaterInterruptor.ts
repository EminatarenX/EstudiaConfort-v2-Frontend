import { IAuthRepository } from "../Domain/IAuthRepository";

export class WaterInterruptor {
  private repository: IAuthRepository;
  constructor(repository: IAuthRepository) {
    this.repository = repository;
  }

  async run(token: string, roomId: string, payload: { water_bomb: number }) {
    return await this.repository.waterInterruptor(token, roomId, payload);
  }
}