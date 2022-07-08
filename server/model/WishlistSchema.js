import mongoose from 'mongoose';

const userWishlistSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    movieName: {
        type: String,
    },
    movieImage: {
        type: String,
    },
    movieRelease: {
        type: String,
    },
    movieRuntime: {
        type: Number,
    }
});

const wishlist = mongoose.model('wishlist', userWishlistSchema);

export default wishlist;