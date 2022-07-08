import express from "express"
import { userWishlist,getWishlist ,RemoveItemWishlist} from "../Controller/Wishlist.js";

const router=express.Router()

router.post('/wishlist', userWishlist);
router.post('/RemoveWishlist', RemoveItemWishlist);
router.get('/getwishlist/:userEmail', getWishlist);

export default router