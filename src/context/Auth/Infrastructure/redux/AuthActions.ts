import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  GET_ALL_ROOMS_USER,
  GET_ALL_ROOMS_USER_ERROR,
  GET_ALL_ROOMS_USER_SUCCESS,
  GET_ROOM_INFO,
  GET_ROOM_INFO_ERROR,
  GET_ROOM_INFO_SUCCESS,
  WATER_INTERRUPTOR,
  WATER_INTERRUPTOR_ERROR,
  WATER_INTERRUPTOR_SUCCESS

} from "./AuthTypes";
import { toast, ToastOptions } from "react-toastify";

const successToast: ToastOptions<unknown> = {
  position: "top-center",
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  icon: false,
  theme: "colored",
};

import {
  authUserController,
  getAllRoomsUserController,
  registrationController,
  getRoomController,
  waterInterruptorController
} from "../Dependencies";
export const LoginAction = async (
  dispatch: any,
  user: { email: string; password: string }
) => {
  try {
    dispatch({ type: LOGIN });
    const data = await authUserController.run(
      user.email,
      user.password
    );
    console.log(data);

    if (data.errors) {
      dispatch({ type: LOGIN_ERROR, payload: data.errors[0].message });
      return false
    }
    const { user: authenticated } = data.data.auth
    localStorage.setItem('token', authenticated.jwt)
    dispatch({ type: LOGIN_SUCCESS, payload: authenticated });
    toast.info("👋 Welcome", successToast);
    return true
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: "Internal Server Error" });
  }
};

export const RegistrationAction = async (
  dispatch: any,
  user: { email: string; password: string; name: string }
) => {
  try {
    dispatch({ type: REGISTRATION });
    const { user: registered } = await registrationController.run(
      user.email,
      user.password,
      user.name
    );
    dispatch({ type: REGISTRATION_SUCCESS, payload: registered });
    toast.info(
      "Hemos enviado un correo de confirmación, por favor revisa tu bandeja de entrada.",
      successToast
    );
  } catch (error) {
    dispatch({ type: REGISTRATION_ERROR, payload: error.response.data.error });
  }
};
export const GetAllRoomsUserAction = async (dispatch: any) => {
  try {
    dispatch({ type: GET_ALL_ROOMS_USER })
    const data = await getAllRoomsUserController.run()

    if (data.errors) {
      dispatch({ type: GET_ALL_ROOMS_USER_ERROR, payload: data.errors[0].message });
      return false
    }

    const { findRooms: rooms } = data.data
    dispatch({ type: GET_ALL_ROOMS_USER_SUCCESS, payload: rooms })
    return true
  } catch (error) {
    console.log(error)
    dispatch({ type: GET_ALL_ROOMS_USER_ERROR, payload: "Internal server Error" })
  }
}


export const GetRoomInfoAction = async (dispatch: any, id: string) => {
  try {
    dispatch({ type: GET_ROOM_INFO })
    const data = await getRoomController.run(id);
    if (data.errors) {
      console.log(data.errors)
      dispatch({ type: GET_ROOM_INFO_ERROR, payload: data.errors[0].message });
      return false
    }
    
    const { findRoom } = data.data
    dispatch({ type: GET_ROOM_INFO_SUCCESS, payload: findRoom })
    
  } catch (error) {
    
  }
}
export const WaterInterruptorAction = async (dispatch: any, roomId: string, payload: {water_bomb: number}) => {
  try {
    dispatch({ type: WATER_INTERRUPTOR })
    const token = localStorage.getItem('token')
    const data = await waterInterruptorController.run(token, roomId, payload);
    if (data.errors) {
      console.log(data.errors)
      dispatch({ type: WATER_INTERRUPTOR_ERROR, payload: data.errors[0].message });
      return false
    }
    dispatch({ type: WATER_INTERRUPTOR_SUCCESS, payload: payload.water_bomb === 1 ? true : false})
    
  } catch (error) {
    
  }
}