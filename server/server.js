const express =require("express");
const dotenv = require('dotenv');
const transportRouter = require('./routes/transportRoutes');
const vehicleRouter = require('./routes/vehicleRoutes');
const shipmentRouter = require('./routes/shipmentRouter');
const materialsRouter = require("./routes/materialsRouter");
const mongoose =require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


//routes
app.use("/api/transports", transportRouter);
app.use("/api/vehicles", vehicleRouter);
app.use("/api/shipments", shipmentRouter);
app.use("/api/materials", materialsRouter);


const port = process.env.PORT;
app.listen(port, async(req,res)=> {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }catch(err) {
        console.log(err);
    }
    console.log(`server listening on the ${port}`)
});