import * as actionTypes from "../constants/WishlistConstants";
import axios from "axios";

const url = "https://moviefliix.herokuapp.com";

export const getWishlistData = (username) => async (dispatch) => {
  try {
    console.log("username:",username)
    const { data } = await axios.get(`${url}/getwishlist/${username}`);
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
