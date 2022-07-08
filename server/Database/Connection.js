import mongoose from "mongoose"


export const Connection =async ()=>{
    try {
        const URL="mongodb+srv://anshul:12345@moviedata.umujj.mongodb.net/?retryWrites=true&w=majority"
        await mongoose.connect(URL,{ useUnifiedTopology: true, useNewUrlParser: true })
        console.log("Successfully connected to the database!!!")
    } catch (error) {
        console.log("Error while connecting to the database!!",error)
    }
}