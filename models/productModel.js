const { Schema, model } = require("mongoose");


const productSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		require: true
	},
	salePrice: {
		type: Number,
		required: true
	},
	discount: {
		type: Number
	},
	pictures: [
		{
			type: String
		}
	],
	shortDetails: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	stock: {
		type: Number,
		required: true
	},
	_new: {
		type: Boolean,
		default: true
	},
	sale: {
		type: Boolean,
		default: true
	},
	category: {
		type: String,
		required: true
	},
	colors: [
		{
			type: String,
			required: true
		}
	],
	tags: [
		{
			type: String
		}
	],
	rating: {
		type: Number
	},
	variants: [
		{
			color: {
				type: String,
				required: true
			},
			image: {
				type: String,
				requied: true
			}
		}
	]

}, {
	timestamps: true
});


module.exports.Product = model("Product", productSchema);