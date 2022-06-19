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
  
  async search(queryFilters) {
    let { brand, price, categorie, owner, name, offer, magnetic } = queryFilters;
    [brand, price, categorie, owner, name, offer, magnetic] = [brand?.trim(), price?.trim(), categorie?.trim(), owner?.trim(), name?.trim(), offer?.trim(), magnetic?.trim()];

    let queryBody = {};
    if(brand) {
      queryBody = {
        ...queryBody,
        brand: { $regex: `.*${brand}.*`, $options: "i" }
      };
    }
    if(price) {
      queryBody = {
        ...queryBody,
        price: { $lte: price }
      }
    }
    if(categorie) {
      queryBody = {
        ...queryBody,
        categories: {
          $elemMatch:{$regex: `.*${categorie}.*`, $options: "i"}
        }
      }
    }
    if(owner) {
      queryBody = {
        ...queryBody,
        owner
      };
    }
    if(name) {
      queryBody = {
        ...queryBody,
        name: {$regex: `.*${name}.*`, $options: "i"}
      };
    }
    if(offer) {
      queryBody = {
        ...queryBody,
        offer: this.parseBoolean(offer)
      };
    }
    if(magnetic) {
      queryBody = {
        ...queryBody,
        magnetic: this.parseBoolean(magnetic)
      };
    }

    return await ProductModel.find(queryBody);
  }

  parseBoolean(value) {
    return (value === "1" || value === "true")? true : false;
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