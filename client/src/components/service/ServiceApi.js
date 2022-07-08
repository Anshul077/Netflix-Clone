import axios from "axios";

const url = 'http://localhost:8000';

export const importWishlistData = async (data) => {
  try {
    return await axios.post(`${url}/wishlist`, data);
  } catch (error) {
    console.log("error calling wishlist api",error.response.data);
  }
};

export const RemoveWishlistData = async (name) => {
  try {
    return await axios.post(`${url}/RemoveWishlist`, name);
  } catch (error) {
    console.log("error calling wishlist api",error.response.data);
  }
};
