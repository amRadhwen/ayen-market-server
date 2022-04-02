const Router = require("express").Router();
const {
	createProduct,
	getAllProducts,
	getMyProducts,
	updateMyProduct,
	deleteMyProduct,
	getProductById
} = require("../controllers/productController");
const { protectUser, protectAdmin } = require("../middlewares/authMiddleware");


Router.route("/")
	.get(protectUser, getAllProducts)
	.post(protectUser, createProduct)

Router.route("/myproducts")
	.get(protectUser, getMyProducts)

Router.route("/:id")
	.get(protectUser, getProductById)
	.put(protectUser, updateMyProduct)
	.delete(protectUser, deleteMyProduct);

module.exports = Router;