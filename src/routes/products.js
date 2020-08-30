const express = require("express");
const router = express.Router();
const { multerUploads } = require("../controllers/Upload");

const ProductsController = require("../controllers/ProductsController");

router.route("/")
    .post(multerUploads, ProductsController.createProducts)
    .get(ProductsController.getProducts)
    .delete(ProductsController.deleteProductsById)
router.route("/:id")
    .get(ProductsController.getProductsById)
    .patch(ProductsController.updateProducts)


module.exports = router;