import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  GET_ALL_ROOMS_USER,
  GET_ALL_ROOMS_USER_ERROR,
  GET_ALL_ROOMS_USER_SUCCESS
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

    if(data.errors){
      dispatch({ type: LOGIN_ERROR, payload: data.errors[0].message });
      return false
    }
    const { auth: authenticated } = data.data
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
export const GetAllRoomsUserAction = async (dispatch: any)=>{
  try {
    dispatch({type: GET_ALL_ROOMS_USER})
    const data = await getAllRoomsUserController.run()

    if(data.errors){
      dispatch({ type: GET_ALL_ROOMS_USER_ERROR, payload: data.errors[0].message });
      return false
    }

    const { findRooms: rooms } = data.data
    dispatch({type: GET_ALL_ROOMS_USER_SUCCESS, payload: rooms})
    return true
  } catch (error) {
    console.log(error)
      dispatch({type: GET_ALL_ROOMS_USER_ERROR, payload: "Internal server Error"})
  }
}