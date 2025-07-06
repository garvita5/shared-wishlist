const { db } = require("../firebase");

// Create wishlist
exports.createWishlist = async (req, res) => {
  try {
    const { name, ownerId, members } = req.body;
    const ref = await db.collection("wishlists").add({
      name,
      ownerId,
      members,
      products: [], // initialize empty products array
      createdAt: new Date(),
    });
    res.send({ id: ref.id });
  } catch (error) {
    console.error("Error creating wishlist:", error);
    res.status(500).send("Failed to create wishlist");
  }
};

// Get wishlists for a user
exports.getUserWishlists = async (req, res) => {
  try {
    const { uid } = req.params;
    const snapshot = await db
      .collection("wishlists")
      .where("members", "array-contains", uid)
      .get();

    const lists = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.send(lists);
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    res.status(500).send("Failed to fetch wishlists");
  }
};

// Add product to a wishlist
exports.addProductToWishlist = async (req, res) => {
  try {
    const { wishlistId } = req.params;
    const { name, link, addedBy } = req.body;

    const wishlistRef = db.collection("wishlists").doc(wishlistId);
    await wishlistRef.update({
      products: db.FieldValue.arrayUnion({
        name,
        link,
        addedBy,
        addedAt: new Date().toISOString(),
      }),
    });

    res.status(200).send({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Failed to add product");
  }
};

// Remove product from wishlist (optional, based on exact product match)
exports.removeProductFromWishlist = async (req, res) => {
  try {
    const { wishlistId } = req.params;
    const { product } = req.body;

    const wishlistRef = db.collection("wishlists").doc(wishlistId);
    await wishlistRef.update({
      products: db.FieldValue.arrayRemove(product),
    });

    res.status(200).send({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).send("Failed to remove product");
  }
};
