const express = require("express");
const recipeRouter = require("./api/recipe-router.js");

const server = express();
const port = 9000;

server.use(express.json());
server.use("/api/recipes", recipeRouter);

server.get("/", (req, res) => {
  res.send("No World");
});

server.listen(port, () => console.log(`Server running on port ${port}`));
