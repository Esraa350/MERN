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
      const watchlist = new watchList({
        userId: id,
        ProductIDs: productId,
      });
      await watchlist.save();
      return res.status(200).json({ message: "Product add to Watch List" });
      // res.status(404);
      // return res.send({ error: "user not found" });
    }
    for (let i = 0; i < user.ProductIDs.length; i++) {
      if (user.ProductIDs[i] == productId) {
        return res.status(400).json({ error: "Product already added" });
      }
    }
    let product = await Product.findById(productId);
    console.log(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    user = await watchList.findOneAndUpdate(
      { userId: id },
      { $push: { ProductIDs: productId } },
      { new: true },
    );

    res.status(200);
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ error: "server error" });
  }
};
watchListController.deleteProductFromUser=async (req, res) => {
  try {
    let { id } = req.params;
    let { productId } = req.body;
    let user = await watchList.findOne({ userId: id });
    console.log(user);
    user = await watchList.findOneAndUpdate(
      { userId: id },
      { $pull: { ProductIDs: productId } },
      { new: true },
    );
    res.status(200);
    return res.send(user);
  }catch(err){
    return res.status(500).send({ error: "server error" });
  }
}

watchListController.getAllWatchList = async (req, res) => {
  try {
    let { id } = req.params;
    const list = await watchList.findOne({ userId: id }).populate("ProductIDs");
    if (!list) {
      res.status(404);
      return res.send({ error: "list not found" });
    }
    return res.status(200).json(list);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
module.exports = watchListController;
