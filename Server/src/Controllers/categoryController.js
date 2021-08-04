const Category = require("../Models/categoriesModel");

const CategoryController = {};

CategoryController.addCategory = async (req, res, next) => {
  const { category} = req.body;

  if (!category) {
    return res
      .status(400)
      .json({ message: "No Category added,Please Try agaian" });
  }
  try {
    const newCategory = new Category({
      category,
    });
    await newCategory.save();
    return res.status(200).json({ message: "Category Added Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

CategoryController.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
CategoryController.updateCategroy = async (req, res, next) => {
  const { id } = req.params;
  const categoryName = req.body;
  console.log(categoryName);
  if (!categoryName)
    return res.status(400).send({ error: "please provide valid input" });
  try {
    const updataCategory = await Category.updateOne({ _id: id }, categoryName);
    if (!updataCategory) {
      return res.status(404).json({ error: "Category not Updated" });
    }
    return res
      .status(200)
      .json({ message: "Category Updated Successfully" });
  } catch (err) {
    console.log(err);
  }
};
CategoryController.getcategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findById({ _id: id }).select("-__v");
    if (!category) {
      return res.status(404).json({ error: "No Product found" });
    }
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
}

CategoryController.deleteCategroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Category.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: "Category Deleted Successfully !" });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "An Error ouccred during deletion!" });
  }
};
module.exports = CategoryController;
