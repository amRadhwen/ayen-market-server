const {Product} = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const {handlePathError} = require("../middlewares/errMiddleware");

// create product
const createProduct = asyncHandler(async (req, res) => {
	if(Object.keys(req.body).length) {
		const {name, price, salePrice, discount, pictures, shortDetails, description, stock, _new, sale, category, colors, tags, rating, variants} = req.body;
		const user = req.user._id;
		const data = {name, price, salePrice, discount, pictures, shortDetails, description, stock, _new, sale, category, colors, tags, rating, variants, user};
		try {
			const product = await Product.create(data);
			if(product) {
				res.status(200).json(product);
			}
			else {
				res.status(400).json({error: "Invalid product data"});
				throw new Error("Invalid product data");
			}
		}
		catch(error) {
			res.status(400).json({error: handlePathError(error)});
			throw new Error(error.message);
		}

	}
	else {
		res.status(400).json({error: "Empty request"});
		throw new Error("Empty request");
	}
});

const getAllProducts = asyncHandler(async (req, res)=>{
	const products = await Product.find()//.sort({"updatedAt": -1}).populate("user", "_id first_name last_name email tel avatar");
	if(products.length) {
		res.status(200).json(products);
	}
	else {
		res.status(404).json({error: "No product found"});
		throw new Error("No product found");
	}
});

const getMyProducts = asyncHandler(async (req, res) => {
	const myProducts = await Product.find({"user": req.user._id}).populate("user", "first_name last_name tel email avatar");
	if(myProducts.length) {
		res.status(200).json(myProducts);
	}
	else {
		res.status(404).json({error: "No Products found"});
		throw new Error("No Products found");
	}
});

const updateMyProduct = asyncHandler(async (req, res) => {
	if(Object.keys(req.body).length) {
		if(req.user._id === req.params.id) {
			try {
				const product = await Product.findById(req.params.id);
				const {name, price, salePrice, discount, pictures, shortDetails, description, stock, _new, sale, category, colors, tags, rating, variants} = req.body;
				const data = {name, price, salePrice, discount, pictures, shortDetails, description, stock, _new, sale, category, colors, tags, rating, variants};

				product.name = name || product.name;
				product.price = price || product.price;
				product.salePrice = salePrice || product.salePrice;
				product.discount = discount || product.discount;
				product.pictures = pictures || product.pictures;
				product.shortDetails = shortDetails || product.shortDetails;
				product.description = description || product.description;
				product.stock = stock || product.stock;
				product._new = pr_newi_newce || product._new;
				product.sale = sale || product.sale;
				product.category = category || product.category;
				product.colors = colors || product.colors;
				product.tags = tags || product.tags;
				product.rating = rating || product.rating;
				product.variants = variants || product.variants;
				
				try {
					const updatedProduct = await product.save();
					if(updatedProduct) {
						res.json(updatedProduct);
					}
					else {
						res.status(400).json({error: "Invalid product data"});
						throw new new Error("Invalid product data");
					}
				}
				catch(error) {
					res.status(400).json({error: handlePathError(error)});
					throw new Error(error.message);
				}
			}
			catch(error) {
				res.status(400).json({error: "Invalid product id"});
				throw new Error("Invalid product id");
			}
		}
		else {
			res.status(400).json({error: "Invalid user id"});
			throw new Error("Invalid user id");
		}

	}
	else {
		res.status(400).json({error: "Empty request"});
		throw new Error("Empty request");
	}
});

const deleteMyProduct = asyncHandler(async (req, res)=>{
	if(req.user._id === req.params.id) {
		try {
			const product = await Product.findById(req.params.id);
			if(product) {
				const deletedProduct = await product.remove();
				if(deletedProduct) {
					res.status(200).json(product);
				}
				else {
					res.status(400).json({error: "Error deleting Product"});
					throw new new Error("Error deleting product");
				}
			}
			else {
				res.status(404).json({error: "Product Not found"});
				throw new Error("Product not found");
			}
		}
		catch(error) {
			res.status(400).json({error: "Invalid product id"});
			throw new Error("invalid product id");
		}
	}
	else {
		res.status(400).json({error: "Invalid user id"});
		throw new Error("Invalid user id");
	}
});

const getProductById = asyncHandler(async (req, res)=>{
	try {
		const product = await Product.findById(req.params.id).populate("user", "_id first_name last_name tel email avatar");
		if(product) {
			res.status(200).json(product);
		}
		else {
			res.status(404).json({error: "Product not found"});
			throw new Error("Product not found");
		}
	}
	catch(error) {
		res.status(400).json({error: "Invalid Product id"});
		throw new Error("Invalid product id");
	}
});

module.exports = {
	createProduct,
	getAllProducts,
	getMyProducts,
	updateMyProduct,
	deleteMyProduct,
	getProductById
}
