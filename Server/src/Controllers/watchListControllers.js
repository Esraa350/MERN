const Product = require("../Models/productModel");
const watchList = require("../Models/watchListModel");

const watchListController = {};

watchListController.addWatchList = async (req, res, next) => {
  const { userId, ProductIDs } = req.body;
  console.log(userId);
  const watchlist = new watchList({
    userId,
    ProductIDs,
  });
  try {
    await watchlist.save();
    return res.status(200).json({ message: "Product add to Watch List" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
watchListController.addProductToWatchList = async (req, res, next) => {
  try {
    let { id } = req.params;

    let { productId } = req.body;
    let user = await watchList.findOne({ userId: id });
    if (!user) {
      res.status(404);
      return res.send({ error: "user not found" });
    }
    for (let i = 0; i < user.ProductIDs.length; i++) {
      if (user.ProductIDs[i] == productId) {
        res.status(400);
        return res.send({ error: "Product already added" });
      }
    }
      let product = await Product.findById(productId);
      if (!product) {
        res.status(404);
        return res.send({ error: "Product not found" });
      }
      user = await watchList.findOneAndUpdate(
        { userId: id },
        { $push: { ProductIDs:productId } },
        { new: true }
      );
    
    res.status(200);
    return res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.send({ error: "server error" });
  }
};

module.exports = watchListController;
