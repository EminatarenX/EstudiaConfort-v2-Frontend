import { AuthRepository } from "./AuthRepository"
import { AuthUser } from "../UseCases/AuthUser"
import { Registration } from "../UseCases/Registration"
import { GetAllUserRooms } from "../UseCases/GetAllUserRooms"
import { GetRoom } from "../UseCases/GetRoom"
import { WaterInterruptor } from "../UseCases/WaterInterruptor"
// Auth
const authRepository = new AuthRepository()
export const authUserController = new AuthUser(authRepository)
// Registration
export const registrationController = new Registration(authRepository)
// Rooms
export const getAllRoomsUserController = new GetAllUserRooms(authRepository)
// get room
export const getRoomController = new GetRoom(authRepository)

export const waterInterruptorController = new WaterInterruptor(authRepository)