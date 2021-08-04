const express = require("express");
const categoryrouter = express.Router();

const CategoryController = require('../Controllers/categoryController');


categoryrouter.post("/", CategoryController.addCategory);
categoryrouter.get('/', CategoryController.getCategories);
categoryrouter.get('/:id',CategoryController.getcategory);
categoryrouter.patch('/:id', CategoryController.updateCategroy);
categoryrouter.delete('/:id', CategoryController.deleteCategroy);


module.exports = categoryrouter;