export interface IAuthRepository {
    login(email: string, password: string) : Promise<any>;
    registration(email: string, password: string) : Promise<any>;
    getAllRooms(token: string): Promise<any>;
    getRoom(token: string, id: string): Promise<any>;
    waterInterruptor(token: string, roomId: string, payload: { water_bomb: number }): Promise<any>;
    editRoom(token: string, payload: { name: string, roomId: string, topic: string, topic_salida: string }): Promise<any>;
    deleteRoom(token: string, roomId: string): Promise<any>;
    createRoom(token: string, payload: { name: string, topic: string, topic_salida: string }): Promise<any>;
}