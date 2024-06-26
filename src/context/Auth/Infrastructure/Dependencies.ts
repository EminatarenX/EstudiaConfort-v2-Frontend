import { AuthRepository } from "./AuthRepository"
import { AuthUser } from "../UseCases/AuthUser"
import { Registration } from "../UseCases/Registration"
import { GetAllUserRooms } from "../UseCases/GetAllUserRooms"
import { GetRoom } from "../UseCases/GetRoom"
import { WaterInterruptor } from "../UseCases/WaterInterruptor"
import { EditRoomUseCase } from "../UseCases/EditRoom"
import { DeleteRoom } from "../UseCases/DeleteRoom"
import { CreateRoom } from "../UseCases/CreateRoom"
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

export const editRoomController = new EditRoomUseCase(authRepository)

export const deleteRoomController = new DeleteRoom(authRepository)

export const createRoomController = new CreateRoom(authRepository)