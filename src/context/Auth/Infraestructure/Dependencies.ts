import { AuthRepository } from "./AuthRepository"
import { AuthUser } from "../UseCases/AuthUser"
import { Registration } from "../UseCases/Registration"
// Auth
const authRepository = new AuthRepository()
export const authUserController = new AuthUser(authRepository)
// Registration
export const registrationController = new Registration(authRepository)