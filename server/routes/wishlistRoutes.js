const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.post("/", wishlistController.createWishlist);
router.get("/:uid", wishlistController.getUserWishlists);
router.post(
  "/:wishlistId/add-product",
  wishlistController.addProductToWishlist
);
router.post(
  "/:wishlistId/remove-product",
  wishlistController.removeProductFromWishlist
); // optional

module.exports = router;
