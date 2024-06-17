
const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "plz enter product name"],
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    Image: {
      type: String,
      required: false,
      default: 0,
    },
  },

  {
    timestamp: true,
  }
);


const Product = mongoose.model("Product", productSchema);

module.exports = Product;