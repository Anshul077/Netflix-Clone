import * as actionTypes from "../constants/WishlistConstants"

export const wishlistReducer=(state = { movie: []},action)=>{
    switch (action.type) {
        case actionTypes.ADD_TO_WISHLIST:
            return{
                movie:action.payload
            }
        case actionTypes.ADD_TO_WISHLIST_ERROR:
            return{
                error:action.error
            }
        default:
            return state;
    }
 }



