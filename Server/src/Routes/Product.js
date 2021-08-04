const express=require("express");
const productRouter=express.Router();
const productController=require("../Controllers/productController");

productRouter.post("/",productController.addProduct);
productRouter.get("/",productController.getAllProducts);
productRouter.get("/:id",productController.getProduct);
productRouter.delete("/:id",productController.deleteProduct);
productRouter.patch("/:id",productController.updateProduct);

module.exports =productRouter;