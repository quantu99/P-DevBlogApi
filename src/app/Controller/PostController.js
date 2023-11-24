const User = require('../Model/User');
const Post = require('../Model/Post');
const PostController = {
    // Create new post
    createNewPost: async (req, res) => {
        try {
            const user = await User.findById(req.body.userId);
            if (!user) {
                return res.status(404).json('You are not authenticated');
            }
            if (user) {
                const newPost = await Post({
                    user: req.body.userId,
                    title: req.body.title,
                    description: req.body.description,
                    image: req.body.image,
                    cat: req.body.cat,
                });
                const newPostSaved = await newPost.save();
                return res.status(200).json(newPostSaved);
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // Get all posts
    getAllPosts: async (req, res) => {
        try {
            const allPosts = await Post.find()
                .populate({
                    path: 'user',
                    model: 'User',
                })
                .populate({
                    path: 'comment',
                    populate: {
                        path: 'user',
                        model: 'User',
                    },
                });
            return res.status(200).json(allPosts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    // Get single posts
    getSinglePost: async (req, res) => {
        try {
            const singlePost = await Post.findById(req.params.id)
                .populate({
                    path: 'user',
                    model: 'User',
                })
                .populate({
                    path: 'comment',
                    populate: {
                        path: 'user',
                        model: 'User',
                    },
                });
            if (!singlePost) {
                return res.status(404).json('Post is not found');
            }
            return res.status(200).json(singlePost);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};
module.exports = PostController;
