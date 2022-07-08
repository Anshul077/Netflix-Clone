import wishlist from "../model/WishlistSchema.js";

export const userWishlist = async (request, response) => {
    try {
        const user = request.body;
        const newUser = new wishlist(user);
        await newUser.save();
        response.status(200).json({ message: user });
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const getWishlist = async (request, response) => {
    try {
        const products = await wishlist.find({email:request.params.userEmail});
        response.json(products);
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const RemoveItemWishlist = async (request, response) => {
    try {
        console.log(request.body.movieName)
        const products = await wishlist.deleteOne({movieName:request.body.data});
        response.json(products);
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}