import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {wishlistReducer} from './reducer/WishlistReducer'
import {reviewReducer} from './reducer/ReviewReducer'

const reducer = combineReducers({
wishlistItems :wishlistReducer,
Reviews:reviewReducer

})


const middleware = [thunk];

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;