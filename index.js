const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
// database
require("./database/connection")
// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
const userR = require("./routes/userRoutes")
app.use("/api", userR);

app.listen(3000, () => {
  console.log(`server running at ${PORT}`);
});
