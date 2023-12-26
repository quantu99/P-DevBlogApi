const User = require('../Model/User');
const UserController = {
    getAllUser: async (req, res) => {
        try {
            const allUser = await User.find();
            return res.status(200).json(allUser);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};
module.exports = UserController;
