var express = require("express");
var auth = require("../middleware/auth");

var productController = require("../controller/productController.js");

var router = express.Router();

router.post("/addProduct", auth, (req, res) => {
  productController.add_product(req, res);
});
router.post("/getAllProducts", auth, (req, res) => {
  productController.getAllProducts(req, res);
});
router.post("/updateProduct", auth, (req, res) => {
  productController.updateProduct(req, res);
});
router.post("/deleteProduct", auth, (req, res) => {
  productController.deleteProduct(req, res);
});

router.get("*", (req, res) => {
  return res.status(404).json({
    message: "Page not found",
  });
});
module.exports = router;
