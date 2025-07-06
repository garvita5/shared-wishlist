const { db } = require("../firebase");

exports.addProduct = async (req, res) => {
  const { wishlistId, name, price, imageUrl, addedBy } = req.body;
  const ref = await db.collection("products").add({
    wishlistId,
    name,
    price,
    imageUrl,
    addedBy,
    createdAt: new Date(),
  });
  res.send({ id: ref.id });
};

exports.getWishlistProducts = async (req, res) => {
  const snapshot = await db
    .collection("products")
    .where("wishlistId", "==", req.params.wishlistId)
    .get();
  const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(products);
};

exports.deleteProduct = async (req, res) => {
  await db.collection("products").doc(req.params.id).delete();
  res.send({ success: true });
};
