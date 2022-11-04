import * as actionTypes from "../constants/ReviewConstants";
import axios from "axios";

const url = "https://moviefliix.herokuapp.com";

export const getReviewData = (movieName) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/getreview/${movieName}`);
    await dispatch({
      type: actionTypes.ADD_REVIEW,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_REVIEW_ERROR,
      payload: error.response,
    });
  }
};
