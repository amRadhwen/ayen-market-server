const { Schema, model } = require("mongoose");



const shopSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	desc: {
		type: String,
		required: true
	},
	addr: {
		type: String,
		required: true
	},
	cover: {
		type: String,
	},
	avatar: {
		type: String,
	},
	socials: [
		{
			facebook: {
				type: String
			}
		},
		{
			instagram: {
				type: String
			}
		},
		{
			linkedin: {
				type: String
			}
		},
		{
			twitter: {
				type: String
			}
		},
		{
			youtube: {
				type: String
			}
		}
	]
}, {
	timestamps: true
})

module.exports.Shop = model("Shop", shopSchema);