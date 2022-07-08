import * as actionTypes from "../constants/WishlistConstants";
import axios from "axios";

const url = "http://localhost:8000";

export const getWishlistData = (userEmail) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/getwishlist/${userEmail}`);
    await dispatch({
      type: actionTypes.ADD_TO_WISHLIST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TO_WISHLIST_ERROR,
      payload: error.response,
    });
  }
};

export const RemoveFromWishlist = (name)=> async (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_WISHLIST_ERROR,
    payload: name
})
};
