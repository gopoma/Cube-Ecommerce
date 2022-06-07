const {mongoose} = require("../config/db");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"]
  },
  description: {
    type: String,
    required: [true, "Please provide description"]
  },
  price: {
    type: Number,
    required: [true, "Please provide price"]
  },
  image: {
    type: String,
    required: [true, "Please provide image"]
  },
  stock: {
    type: Number,
    required: [true, "Please provide stock"]
  }
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;