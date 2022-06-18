const express = require("express");
const CartService = require("../services/cart");
const authValidation = require("../middleware/auth");

function cart(app) {
  const router = express.Router();
  const cartServ = new CartService();

  app.use("/api/cart", router);

  router.get("/", authValidation(1), async (req, res) => {
    const result = await cartServ.getItems(req.user.id);
    return res.json(result);
  });
  router.post("/add", authValidation(1), async (req, res) => {
    const {idProduct, amount} = req.body;
    const result = await cartServ.addToCart(req.user.id, idProduct, amount);

    return res.json(result);
  });
  router.delete("/remove", authValidation(1), async (req, res) => {
    const {idProduct} = req.body;
    const result = await cartServ.removeFromCart(req.user.id, idProduct);

    return res.json(result);
  });
  router.post("/paymentCompleted", authValidation(1), async (req, res) => {
    const result = await cartServ.clearCart(req.user.id);
    return res.json(result);
  });
  router.get("/pay", authValidation(1), async (req, res) => {
    const result = await cartServ.pay(req.user.id);
    return res.json(result);
  });
}

module.exports = cart;