const { Schema, model } = require("mongoose");


const productSchema = new Schema({
	/*user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},*/
	name: {
		type: String,
		//required: true
	},
	cover: {
		type: String,
		//required: true
	},
	images: [{
		type: String,
	}],
	video: {
		type: String,
	},
	description: {
		type: String,
		//required: true
	},
	category: {
		type: String,
		//required: true
	},
	countInStock: {
		type: Number,
		//required: true
	},
	price: {
		type: Number,
		//required: true
	}
}, {
	timestamps: true
});


module.exports.Product = model("Product", productSchema);