const express = require("express");
const {
  authResponse,
  deleteCookie
} = require("../helpers/authResponse");
const AuthService = require("../services/auth");
const passport = require("passport");
const {useGoogleStrategy} = require("../middleware/authProvider");

function auth(app) {
  const router = express.Router();
  const authServ = new AuthService();
  app.use("/api/auth", router);
  app.use(passport.initialize());
  // Usando strategias
  passport.use(useGoogleStrategy());

  router.post("/login", async (req, res) => {
    const result = await authServ.login(req.body);
    return authResponse(res, result, 401);
  });
  router.post("/signup", async (req, res) => {
    const result = await authServ.signup(req.body);
    return authResponse(res, result, 400);
  });
  router.get("/logout", (req, res) => {
    return deleteCookie(res);
  });
  router.get("/google", passport.authenticate("google", {
    scope: ["email", "profile"]
  }));
  router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    return res.json({
      success: true,
      message: "Logged successfully"
    });
  });
}

module.exports = auth;