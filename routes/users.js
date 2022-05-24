const express = require("express");

function users(app) {
  const router = express.Router();
  app.use("/api/users", router);

  router.get("/", (req, res) => {
    console.log("Tropical:", req.cookies);
    console.log("Headers:", req.headers.cookie);

    return res.json({
      success: true
    });
  });
}

module.exports = users;