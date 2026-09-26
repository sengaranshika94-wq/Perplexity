import mongoose from "mongoose";

async function connectToDb(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to DB")
    })
}

 