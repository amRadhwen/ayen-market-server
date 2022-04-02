const { Schema, model } = require("mongoose");



const shopSchema = new Schema({
	name: {
		type: String,
		required: true
		unique
	},
	desc: {
		type: String,
		required: true
	}
	addr: {
		type: String,
		required: true
	},
	cover: {
		type: String,
	},
	logo: {
		type: String,
	}
}, {
	timestamps: true
})

module.exports.Shop = model("Shop", shopSchema);