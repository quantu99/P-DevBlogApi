const Conversation = require('../Model/Conversation');

const ConversationController = {
    createNew: async (req, res) => {
        const newConversation = new Conversation({ members: [req.body.senderId, req.body.receiverId] });
        try {
            const savedConversation = await newConversation.save();
            return res.status(200).json(savedConversation);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getUserConv: async (req, res) => {
        try {
            const conversation = await Conversation.find({
                members: { $in: [req.params.id] },
            });
            return res.status(200).json(conversation);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};
module.exports = ConversationController;
