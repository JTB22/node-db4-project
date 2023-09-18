const express = require("express");
const Recipe = require("./recipe-model.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  Recipe.getRecipes()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Recipe.getRecipeById(req.params.id)
    .then((recipe) => {
      // console.log(recipe);
      res.status(200).json(recipe);
    })
    .catch(next);
});

router.get("/:id/shoppingList", (req, res, next) => {
  Recipe.getShoppingList(req.params.id)
    .then((ingredients) => {
      res.status(200).json(ingredients);
    })
    .catch(next);
});

router.get("/:id/instructions", (req, res, next) => {
  Recipe.getInstructions(req.params.id)
    .then((instructions) => {
      res.status(200).json(instructions);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  const recipe = req.body;
  if (!recipe.name) {
    res.status(400).json({ message: "Recipe name is required" });
  } else {
    Recipe.addRecipe(recipe)
      .then((newRecipe) => {
        res.status(201).json(newRecipe);
      })
      .catch(next);
  }
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = router;
