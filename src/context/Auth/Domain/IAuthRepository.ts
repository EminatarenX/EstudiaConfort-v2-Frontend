export interface IAuthRepository {
    login(email: string, password: string) : Promise<any>;
    registration(email: string, password: string, name: string) : Promise<any>;
    getAllRooms(token: string): Promise<any>;
    getRoom(token: string, id: string): Promise<any>;
    waterInterruptor(token: string, roomId: string, payload: { water_bomb: number }): Promise<any>;
}