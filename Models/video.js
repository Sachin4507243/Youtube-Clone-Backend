const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    trim: true,
    minLength: 12,
    required: true
  },

  description: {
    type: String,
    trim: true
  },

  category: {  
    type: String,
    default: "All"
  },

  video: {
    type: String,
    required: true,
    trim: true
  },

  thumbnail: {
    type: String,
    required: true,
    trim: true
  },

  likes: {
    type: Number,
    default: 0
  },

  dislikes: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
