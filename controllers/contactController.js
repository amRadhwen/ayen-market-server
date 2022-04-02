const {Contact} = require("../models/contactModel");
const asyncHandler = require("express-async-handler");
const {handlePathError} = require("../middlewares/errMiddleware");

// create new contact
// visitor or normal connected user can contact admin
const createContact = asyncHandler(async (req, res)=> {
	if(Object.keys(req.body).length) {
		const data = {name, email, tel, object, message} = req.body;
		try {
			const contact = await Contact.create(data);
			if(contact) {
				res.status(200).json({
					success: true,
					id: contact._id
				})
			}
			else {
				res.status(400).json({error: "Invalid Data"});
				throw new Error("Invalid Data");
			}
		}
		catch(error) {
			res.status(400).json({error: handlePathError(error)});
			throw new Error(error);
		}
	}
	else {
		res.status(400).json({error: "Empty request"});
		throw new Error("Empty request");
	}
})

// get all contacts
const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find().select("-password");
	if(contacts) {
		res.status(200).json(contacts);
	}
	else {
		res.status(401).json({error: "No contact found"})
	}
})

const getContact = asyncHandler(async (req, res) => {
	const id = req.params.id;
	try {
		const contact = await Contact.findById(id);
		if(contact) {
			res.status(200).json(contact);
		}
		else {
			res.status(404).json({error: "Contact not found"});
			throw new Erro("contact not found");
		}
	}
	catch(error) {
		res.status(400).json({error: "Invalid contact id"});
		throw new Error(error);
	}
})

const deleteContact = asyncHandler(async (req, res) => {
	const id = req.params.id;
	try {
		const contact = await Contact.findById(id);
		if(contact) {
			const deletedContact = await contact.remove();
			if(deletedContact) {
				res.status(200).json({contact})
			}
			else {
				res.status(401).json({error: "Error deleting contact"});
				throw new Error("Error deletinf contact");
			}
		}
		else {
			res.status(404).json({error: "Contact not found"});
		}
	}
	catch(error) {
		res.status(400).json({error: "Invalid contact id"});
		throw new Error(error);
	}
})

module.exports = {
	createContact,
	getContacts,
	getContact,
	deleteContact
}