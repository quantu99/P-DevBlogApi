const Post = require('../Model/Post');
const User = require('../Model/User');
const Comment = require('../Model/Comment');
const CommentController = {
    // Create new comment
    createNewComment: async (req, res) => {
        try {
            const user = await User.findById(req.body.userId);
            const post = await Post.findById(req.body.postId);
            if (!user) {
                return res.status(404).json('You are not authenticated');
            }
            if (user) {
                const newComment = await new Comment({
                    user: req.body.userId,
                    post: req.body.postId,
                    description: req.body.description,
                });
                const newCommentSave = await newComment.save();
                await post.updateOne({ $push: { comment: newCommentSave } });
                return res.status(200).json(newCommentSave);
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};
module.exports = CommentController;
