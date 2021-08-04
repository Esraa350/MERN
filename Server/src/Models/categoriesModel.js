const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  category: {type: String,required: [true, "Please Enter Category Name"]},
  createdAt: {type: Date,default: Date.now},
});
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;