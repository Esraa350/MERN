const express=require("express");
const watchListRouter=express.Router();
const watchListController=require("../Controllers/watchListControllers");

watchListRouter.post("/",watchListController.addWatchList);
watchListRouter.post("/:id/product",watchListController.addProductToWatchList);
module.exports =watchListRouter;