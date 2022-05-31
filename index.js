const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookies = require("cookie-parser");
const {port} = require("./config");
const {connection} = require("./config/db");
const passport = require("passport");

// Importando routes:
const auth = require("./routes/auth");
const users = require("./routes/users");

// Importando Estrategias
const {
  useGoogleStrategy
} = require("./middleware/authProvider");

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
app.use(passport.initialize());
// Usando Estrategias
passport.use(useGoogleStrategy());

// Utilizando las rutas:
auth(app);
users(app);

app.get("/", (req, res) => {
  return res.json({message:"Cube-Ecommerce"});
});

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});