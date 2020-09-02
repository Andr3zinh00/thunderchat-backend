const router = require("express").Router();
const { catchErrors } = require('../handlers/errorHandler');
const contactController = require('../controllers/ContactController');

const auth = require("../middlewares/auth");

router.post("/add-contact", auth, catchErrors(contactController.addContact))
router.get("/get-contacts/:id", auth, catchErrors(contactController.getContacts))

module.exports = router;