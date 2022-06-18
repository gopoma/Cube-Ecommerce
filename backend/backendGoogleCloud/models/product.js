const { mongoose } = require("../config/db");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"]
  },
  description: {
    type: String,
    required: [true, "Please provide description"]
  },
  brand: {
    type: String,
    required: [true, "Please provide brand"]
  },
  price: {
    type: Number,
    required: [true, "Please provide price"]
  },
  images: {
    type: [String],
    required: [true, "Please provide an image"]
  },
  categories: {
    type: [String],
    required: [true, "Please provide a categorie"]
  },
  stock: {
    type: Number,
    required: [true, "Please provide stock"]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;