const Conversation = require('../Model/Conversation');

const ConversationController = {
    createNew: async (req, res) => {
        const { senderId, receiverId } = req.body;
        const newConversation = new Conversation({
            members: [senderId, receiverId],
        });
        try {
            const savedConversation = await newConversation.save();
            return res.status(200).json(savedConversation);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getUserConv: async (req, res) => {
        try {
            const userId = req.params.id;

            const conversations = await Conversation.find({
                members: userId,
            }).populate('members');

            return res.status(200).json(conversations);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        }
    },
    getDetailConv: async (req, res) => {
        try {
            const detailConv = await Conversation.findById(req.params.conversationId);
            return res.status(200).json(detailConv);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};
module.exports = ConversationController;
