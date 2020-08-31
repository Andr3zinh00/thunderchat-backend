const router = require("express").Router();
const { catchErrors } = require('../handlers/errorHandler');
const contactController = require('../controllers/ContactController');

const auth = require("../middlewares/auth");

router.post("/contacts/add-contact", auth, catchErrors(contactController.addContact))

module.exports = router;