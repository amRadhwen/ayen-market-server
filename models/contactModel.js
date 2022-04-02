const { Schema, model} = require("mongoose");


const contactSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	tel: {
		type: String,
		required: true
	},
	object: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})

module.exports.Contact = model("Contact", contactSchema);