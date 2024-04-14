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
  WATER_INTERRUPTOR_SUCCESS,
  CHANGE_SENSORS_DATA,
  EDIT_ROOM,
  EDIT_ROOM_ERROR,
  EDIT_ROOM_SUCCESS,
  DELETE_ROOM,
  DELETE_ROOM_ERROR,
  DELETE_ROOM_SUCCESS,
  CREATE_ROOM,
  CREATE_ROOM_ERROR,
  CREATE_ROOM_SUCCESS

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
  waterInterruptorController,
  editRoomController,
  deleteRoomController,
  createRoomController
} from "../Dependencies";
export const LoginAction = async (
  dispatch: any,
  user: { email: string; password: string }
) => {
  try {
    dispatch({ type: LOGIN });
    const {data} = await authUserController.run(
      user.email,
      user.password
    );

    if (data.auth.code == 400) {
      dispatch({ type: LOGIN_ERROR, payload: data.auth.message });
      return false
    }
    const { user: authenticated } = data.auth
    localStorage.setItem('token', authenticated.jwt)
    dispatch({ type: LOGIN_SUCCESS, payload: authenticated });
    toast.info("👋 Welcome", successToast);
    return true
  } catch (error) {
    console.log(error)
    dispatch({ type: LOGIN_ERROR, payload: "Internal Server Error" });
  }
};

export const RegistrationAction = async (
  dispatch: any,
  user: { email: string; password: string; name: string }
) => {
  try {
    dispatch({ type: REGISTRATION });
    const { data } = await registrationController.run(
      user.email,
      user.password,
    );
    if(data.createUser.code == 400) {
      dispatch({ type: REGISTRATION_ERROR, payload: data.createUser.message });
      return false
    }
    dispatch({ type: REGISTRATION_SUCCESS, payload: true });
    toast.info(
      "🙌 Se ha registrado correctamente, por favor inicie sesión",
      successToast
    );
    return true
  } catch (error) {
    dispatch({ type: REGISTRATION_ERROR, payload: error.response.data.error });
    return false
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

export const changeStateSensorsAction = async (dispatch: any, payload: any) => {
  dispatch({ type: CHANGE_SENSORS_DATA, payload})
}

export const editRoomAction = async (dispatch: any, payload: {name: string, roomId: string, topic: string, topic_salida: string}) => {
  try {
    dispatch({ type: EDIT_ROOM })
    const token = localStorage.getItem('token')
    const {data} = await editRoomController.run(token, payload);
    if (data.errors) {
      dispatch({ type: EDIT_ROOM_ERROR, payload: data.errors[0].message });
      return false
    }
    const room = data.updateRoom.room
    dispatch({ type: EDIT_ROOM_SUCCESS, payload: room})
    toast.info(" 👍 Habitación actualizada", successToast)
    return true

  } catch (error) {
    dispatch({ type: EDIT_ROOM_ERROR, payload: "Internal server Error" })
  }
}

export const deleteRoomAction = async (dispatch: any, roomId: string) => {
  try {
    dispatch({ type: DELETE_ROOM })
    const token = localStorage.getItem('token')
    const data = await deleteRoomController.run(token, roomId);
    if (data.errors) {
      dispatch({ type: DELETE_ROOM_ERROR, payload: data.errors[0].message });
    }
    dispatch({ type: DELETE_ROOM_SUCCESS, payload: roomId })
    toast.info("👋 Habitación eliminada", successToast)
    return true
  } catch (error) {
    return error
  }
}

export const createRoomAction = async (dispatch: any, payload: {name: string, topic: string, topic_salida: string}) => {
  try {
    dispatch({ type: CREATE_ROOM })
    const token = localStorage.getItem('token')
    const {data} = await createRoomController.run(token, payload);
    if (data.errors) {
      dispatch({ type: CREATE_ROOM_ERROR, payload: data.errors[0].message });
      toast.error("👎 Error al crear la habitación", successToast)
    }
    const room = data.createRoom
    dispatch({ type: CREATE_ROOM_SUCCESS, payload: room})
    toast.info("👍 Habitación creada", successToast)
    return true
  } catch (error) {
    return error
  }
}