import * as actionTypes from "../constants/ReviewConstants"

export const reviewReducer=(state = { userReviews: []},action)=>{
    switch (action.type) {
        case actionTypes.ADD_REVIEW:
            return{
                userReviews:action.payload
            }
        case actionTypes.ADD_REVIEW_ERROR:
            return{
                error:action.error
            }
        default:
            return state;
    }
 }

