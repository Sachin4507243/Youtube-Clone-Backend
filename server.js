const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect("mongodb+srv://sachinpathania525:oAvY7H5EREsUUku4@youtubeclone.ojueu0j.mongodb.net/youtubeclone?retryWrites=true&w=majority")
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("DB connection failed:", err.message);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS Configuration
const allowedOrigins = [
  'https://you-tube-clone-frontend-alpha.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
}));

// Routes
const userRoute = require('./Routes/user.js');
const videoRoute = require('./Routes/video.js');
const commentRoute = require('./Routes/comment.js');

app.use(userRoute);
app.use(videoRoute);
app.use(commentRoute);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
