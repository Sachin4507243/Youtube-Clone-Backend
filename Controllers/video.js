const Video = require("../Models/video.js");

// Post Video
exports.addVideo = async (req, res) => {
  const { title, description, video, category, thumbnail } = req.body;

  try {
    const newVideo = new Video({
      title,
      description,
      video,
      category,
      thumbnail,
      userId: req.user._id,
    });

    const createdVideo = await newVideo.save();

    return res.status(201).json({
      msg: "Video uploaded successfully",
      success: true,
      video: createdVideo,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Get All Videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate(
      "userId",
      "channelName username photo createdAt"
    );

    if (!videos || videos.length === 0) {
      return res.status(404).json({ msg: "Videos not found" });
    }

    return res.status(200).json({
      msg: "Videos found",
      success: true,
      videos,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Get Video by ID
exports.getVideoById = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id).populate(
      "userId",
      "channelName username photo createdAt"
    );

    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }

    return res.status(200).json({
      msg: "Video found",
      success: true,
      video,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getVideoByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.find({ userId: id }).populate(
      "userId",
      "channelName username photo createdAt"
    );
    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }
    return res
      .status(200)
      .json({ mgs: "Video found", success: true, videos: video });
      
  } catch (err) {
    console.log(err);

    return res.status(500).json({ msg: "Internal server error" });
  }
};
