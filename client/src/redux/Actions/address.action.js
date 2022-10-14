import { instance } from "../../apis/api.instance";
import { ADDRESS_ERROR, UPDATE_ADDRESS } from "../Constants/action";
export const updateMyAddress = (data) => async (dispatch) => {
  try {
    const res = await instance.put(`/api/address/update`, data);
    dispatch({
      type: UPDATE_ADDRESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADDRESS_ERROR,
      payload: err,
    });
  }
};
