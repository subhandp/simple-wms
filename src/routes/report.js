const express = require("express");
const router = express.Router();

const ReportController = require("../controllers/ReportController");


router.route("/:type/:id")
    .get(ProductOutController.getProductOutById)
    .patch(ProductOutController.updateProductOut)


module.exports = router;