import {AUTH} from "../../constants/actionTypes";
import * as api from "../../api";

export const signin = (formData, history) => async (dispatch) => {
   try {
      const {data} = await api.signin(formData);
      dispatch({type: AUTH, data});
      history.push("/")
   } catch (err) {
      console.log(err.message);
   }
};

export const signup = (formData, history) => async (dispatch) => {
   try {
      const {data} = await api.signup(formData);
      console.log(data)
      dispatch({type: AUTH, data});
      history.push("/")
   } catch (err) {
      console.log(err.message);
   }
};