const express = require("express");
const router = express.Router();

const ProductInController = require("../controllers/ProductInController");

router.route("/")
    .post(ProductInController.createProductIn)
    .get(ProductInController.getProductIn)
    .delete(ProductInController.deleteProductInById)
router.route("/:id")
    .get(ProductInController.getProductInById)
    .patch(ProductInController.updateProductIn)


module.exports = router;