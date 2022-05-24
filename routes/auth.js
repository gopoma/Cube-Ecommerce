const express = require("express");
const AuthService = require("../services/auth");

function auth(app) {
  const router = express.Router();
  const authServ = new AuthService();
  app.use("/api/auth", router);

  router.post("/login", async (req, res) => {
    const result = await authServ.login(req.body);
    const token = result.token;

    return res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Solo disponible a través de https*
      sameSite: "none",
      expires: new Date(new Date().setDate(new Date().getDate() + 7))
    }).json(result);
  });
  router.post("/signup", async (req, res) => {
    const result = await authServ.signup(req.body);
    const token = result.token;

    if(!result.success) {
      return res.json(result);
    }

    return res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      expires: new Date(new Date().setDate(new Date().getDate() + 4))
    }).json(result);
  });
}

module.exports = auth;