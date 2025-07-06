const express = require("express");
const cors = require("cors");
const wishlistRoutes = require("./routes/wishlistRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/wishlists", wishlistRoutes);
app.use("/products", productRoutes);

module.exports = app;
