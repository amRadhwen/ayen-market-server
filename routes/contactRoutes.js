const Router = require("express").Router();
const {
	createContact,
	getContacts,
	getContact,
	deleteContact
} = require("../controllers/contactController");
const {protectUser, protectAdmin} = require("../middlewares/authMiddleware");

Router.route("/")
	.get(protectAdmin, getContacts)
	.post(createContact)


Router.route("/:id")
	.get(protectAdmin, getContact)
	.delete(protectAdmin, deleteContact);

module.exports = Router;