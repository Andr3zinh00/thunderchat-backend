const router = require("express").Router();
const { catchErrors } = require('../handlers/errorHandler');
const notificationController = require('../controllers/NotificationController');

const auth = require("../middlewares/auth");

router.post("/send-notification", auth, catchErrors(notificationController.send))
router.get("/get-notification", auth, catchErrors(notificationController.getNotification))

module.exports = router;