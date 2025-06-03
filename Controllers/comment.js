const Comment = require("../Models/comment.js");

exports.addComment = async (req, res) => {
  const { videoId, comment } = req.body;
  try {
    const newcomment = new Comment({
      userId: req.user.id,
      videoId,
      comment,
    });

    const createComment = await newcomment.save();

    if (createComment) {
      return res
        .status(201)
        .json({
          msg: "Comment added successfully",
          success: true,
          message: createComment,
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};


// get comment by video id

exports.getCommentByVideoId = async (req, res) =>{



    try{
      const {videoId} = req.params;
      const comment = await Comment.find({videoId}).populate("userId", "channelName photo username createdAt");

      return res
      .status(200)
      .json({msg:"Comment founds", success:true, comments:comment});
    }catch(err){
        return res
        .status(500)
        .json({msg:"Internal server error"});
    }
}