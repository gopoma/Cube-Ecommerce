const ProductModel = require("../models/product");
const { stripeSecretKey } = require("../config");
const dbError = require("../helpers/dbError");
const stripe = require("stripe")(stripeSecretKey);

class ProductService {
  async getAll() {
    const products = await ProductModel.find();
    return products;
  }
  
  async get(idProduct) {
    return await ProductModel.findById(idProduct);
  }
  
  async filterByBrand(brand) {
    return await ProductModel.find({ 
      brand: { $regex: `.*${brand}.*`, $options: "i" }
    });
  }

  async search(queryFilters) {
    let { brand, price, categorie } = queryFilters;
    [brand, price, categorie] = [brand?.trim(), price?.trim(), categorie?.trim()];

    if(brand && !price && !categorie) {
      return await this.filterByBrand(brand);
    }

    return queryFilters;
  }

  async create(data) {
    try {
      const product = await ProductModel.create(data);
      return product;
    } catch(error) {
      return dbError(error);
    }
  }
}

module.exports = ProductService;