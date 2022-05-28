const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookies = require("cookie-parser");
const {port} = require("./config");
const {connection} = require("./config/db");

// Importando routes:
const auth = require("./routes/auth");
const users = require("./routes/users");

const app = express();
connection();

// Utilizando middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin:["http://localhost:3000"]
}));
app.use(cookies());

// Utilizando las rutas:
auth(app);
users(app);

app.get("/", (req, res) => {
  return res.json({message:"Cube-Ecommerce"});
});

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});