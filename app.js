const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const dotenv = require("dotenv");
dotenv.config();
const port = 3002;

const swaggerUI = require("swagger-ui-express");
const swaggerJsDocs = require("./swagger.json");
app.use("/swagger-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

require("./dbConnection").connect();

require("./dbConnection").syn();
require("./models");

app.get("/", (req, res) => {
  res.send("Home Page");
});

const router = require("./routes/route");
app.use("/api", router);

//static files
app.use("/Images", express.static("/Images"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} `);
});
