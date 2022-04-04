const { Schema, model } = require("mongoose");



const shopSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	bio: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	cover: {
		type: String,
	},
	logo: {
		type: String,
	},
	followers: [
		{
			type: Schema.Types.ObjectId,
			ref: "User"
		}
	],
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: "User"
		}
	],
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