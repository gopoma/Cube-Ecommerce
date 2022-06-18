const express = require("express");
const ProductService = require("../services/products");
const authValidation = require("../middleware/auth");

function products(app) {
  const router = express.Router();
  const productServ = new ProductService();

  app.use("/api/products", router);

  router.get("/", async (req, res) => {
    const result = await productServ.getAll();
    return res.json(result);
  });
  router.post("/", authValidation(1), async (req, res) => {
    const result = await productServ.create({
      ...req.body,
      owner: req.user.id
    });
    return res.json(result);
  });
}

module.exports = products;