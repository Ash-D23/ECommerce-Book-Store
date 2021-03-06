import { loginFailure, loginStart, loginSuccess, registerSuccess, registerError } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  try{
    const res = await publicRequest.post("/auth/register", user)
    dispatch(registerSuccess(res.data));

  }catch(err){
    dispatch(registerError())
  }
}