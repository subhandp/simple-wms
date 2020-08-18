const express = require("express");
const router = express.Router();

const ProductOutController = require("../controllers/ProductOutController");

router.route("/")
    .post(ProductOutController.createProductOut)
    .get(ProductOutController.getProductOut)
    .delete(ProductOutController.deleteProductOutById)
router.route("/:id")
    .get(ProductOutController.getProductOutById)
    .patch(ProductOutController.updateProductOut)


module.exports = router;