const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    
    owner:{type:String},
    productImage:{type:String},
    name: { type: String, required: [true, "Please Enter Product Name"] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    quantity:{type:Number},
    price:{type:Number,required:[true,"Please Enter Price of this Product"]},
    createdAt: { type: Date, default: Date.now },
});
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;