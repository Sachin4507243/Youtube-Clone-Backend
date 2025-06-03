const express = require('express');
const { addVideo, getAllVideos, getVideoById, getVideoByUserId } = require('../Controllers/video');
const router = express.Router();
const {Authorization} = require('../Middlewears/auth.js');

// Post Video
router.post('/video', Authorization, addVideo);

// Get all videos

router.get('/videos', getAllVideos);

// get video by id

router.get("/video/:id", getVideoById);

// get video by user id
router.get('/video/user/:id', getVideoByUserId);

module.exports = router;