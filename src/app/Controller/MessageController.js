const Message = require('../Model/Message');

const MessageController = {
    createNew: async (req, res) => {
        const newMessage = new Message(req.body);
        try {
            const savedMessage = await newMessage.save();
            return res.status(200).json(savedMessage);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    get: async (req, res) => {
        try {
            const message = await Message.find({
                conversationId: req.params.conversationId,
            })
                .populate('sender')
                .populate('receiver');
            return res.status(200).json(message);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};
module.exports = MessageController;
