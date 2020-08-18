const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/ProductsController");

router.route("/")
    .get(ProductsController.getProducts)
    .delete(ProductsController.deleteProductsById)
router.route("/:id")
    .get(ProductsController.getProductsById)
    .patch(ProductsController.updateProducts)


module.exports = router;