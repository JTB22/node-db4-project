const db = require("./db-config.js");

function getRecipes() {
  return db("recipes");
}

async function getRecipeById(id) {
  const recipe = await db("recipes").where({ id }).first();
  const stepsQ = await db("steps")
    .where({ recipe_id: id })
    .orderBy("step_number", "asc");
  const ingredients = await db("recipe_ingredients as ri")
    .where({ recipe_id: id })
    .join("ingredients as i", "ri.ingredient_id", "i.id")
    .select("ri.ingredient_id", "i.ingredient_name", "ri.quantity");

  console.log(ingredients);
  const result = {
    recipe_id: recipe.id,
    recipe_name: recipe.recipe_name,
    created_at: recipe.created_at,
    steps: [],
  };
  stepsQ.forEach((step) => {
    result.steps.push({
      step_id: step.id,
      step_number: step.step_number,
      step_instructions: step.step_instruction,
      ingredients: [],
    });
    if (step.ingredient_id) {
      const ing = ingredients.find(
        (i) => i.ingredient_id === step.ingredient_id
      );
      result.steps[result.steps.length - 1].ingredients.push({
        ingredient_id: step.ingredient_id,
        ingredient_name: ing.ingredient_name,
        quantity: ing.quantity,
      });
    }
  });

  return result;
}

function getShoppingList(recipe_id) {
  return db("recipes as r")
    .join("ingredients as i", "r.id", "i.recipe_id")
    .select("i.name", "i.quantity")
    .where("r.id", recipe_id);
}

function getInstructions(recipe_id) {
  return db("recipes as r")
    .join("steps as s", "r.id", "s.recipe_id")
    .select("s.step_number", "s.instructions")
    .where("r.id", recipe_id)
    .orderBy("s.step_number", "asc");
}

function addRecipe(recipe) {
  return db("recipes")
    .insert(recipe)
    .then((ids) => {
      return getRecipes().where({ id: ids[0] }).first();
    });
}

module.exports = {
  getRecipes,
  getRecipeById,
  getShoppingList,
  getInstructions,
  addRecipe,
};
