const express = require("express");
const ProductService = require("../services/products");
const authValidation = require("../middleware/auth");

function products(app) {
  const router = express.Router();
  const productServ = new ProductService();

  app.use("/api/products", router);

  router.get("/search", async (req, res) => {
    const result = await productServ.search(req.query);
    return res.json(result);
  });
  router.get("/:idProduct", async (req, res) => {
    const result = await productServ.get(req.params.idProduct);
    return res.json(result);
  });
  router.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit) || undefined;
    const page = parseInt(req.query.page) || undefined;

    const result = await productServ.getAll(limit, page);
    return res.json(result);
  });
  router.post("/", authValidation(25), async (req, res) => {
    const result = await productServ.create({
      ...req.body,
      owner: req.user.id
    });
    return res.json(result);
  });
}

module.exports = products;