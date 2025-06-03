const express = require("express");
const { addComment, getCommentByVideoId } = require("../Controllers/comment");
const { Authorization } = require("../Middlewears/auth");
const router = express.Router();

// POST comments
router.post('/comment', Authorization ,addComment);

// get comment by video id
router.get('/comment/:videoId', getCommentByVideoId);




module.exports = router;