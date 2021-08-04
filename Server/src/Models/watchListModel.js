const mongoose = require("mongoose");
const watchListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ProductIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: Date.now },
});
const watchList = mongoose.model("watchList", watchListSchema);

module.exports = watchList;
