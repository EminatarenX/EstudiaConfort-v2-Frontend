import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
} from "./AuthTypes";
import { toast } from "react-toastify";

import {
  authUserController,
  registrationController,
} from "../Infraestructure/Dependencies";
export const LoginAction = async (
  dispatch: any,
  user: { email: string; password: string }
) => {
  try {
    dispatch({ type: LOGIN });
    const { user: authenticated } = await authUserController.run(
      user.email,
      user.password
    );
    dispatch({ type: LOGIN_SUCCESS, payload: authenticated });
    toast.info(
      "Hemos enviado un correo de confirmación, por favor revisa tu bandeja de entrada.",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        theme: "colored",
      }
    );
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error.response.data.error });
    console.log(error);
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
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTRATION_ERROR, payload: error.response.data.error });
  }
};
