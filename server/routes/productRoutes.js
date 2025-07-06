const express = require("express");
const router = express.Router();
const {
  addProduct,
  getWishlistProducts,
  deleteProduct,
} = require("../controllers/productController");

router.post("/", addProduct);
router.get("/:wishlistId", getWishlistProducts);
router.delete("/:id", deleteProduct);
module.exports = router;
