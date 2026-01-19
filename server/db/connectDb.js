const mongoose= require("mongoose");

const connectDb= async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }catch(err){
        console.log("err",err);
    }
}

module.export = {connectDb};

