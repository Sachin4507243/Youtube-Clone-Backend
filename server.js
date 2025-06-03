const express = require("express");
const app = express();

const cookieParser = require('cookie-parser'); 

// Dotenv 
const dotenv = require('dotenv');
dotenv.config();


// add corss origin
const cors = require("cors");


// Mongoose DataBase Connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL)
.then(()=>{
     console.log("Db connect");
}).catch((err)=>{
   console.log("DB connection fail");
})

// Middlewear
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials (cookies)
  })
);


// Routes
const userRoute = require('./Routes/user.js');
const videoRoute = require('./Routes/video.js');
const commentRoute = require('./Routes/comment.js');



// api mdiddlewears
app.use(userRoute);
app.use(videoRoute);
app.use(commentRoute);



// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`server run on port ${PORT}`);
});