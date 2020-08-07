const router = require("express").Router();
const { catchErrors } = require('../handlers/errorHandler');
const chatController = require('../controllers/ChatController');

const auth = require("../middlewares/auth");

router.post("/", auth, catchErrors(chatController.createChatRoom))

module.exports = router;