//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes
const express = require("express");
const router = express.Router();
const data = require("../data");
const pokemondata = data.pokemonData;
const helper = require("../helpers");

router.route("/").get(async (req, res) => {
  try {
    const pokeList = await pokemondata.pokemon();
    res.json(pokeList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
//Request Method

router.route("/:id").get(async (req, res) => {
  try {
    req.params.id = helper.checkId(req.params.id);
  } catch (e) {
    res.status(400).json({ error: e });
  }
  try {
    const pokeList = await pokemondata.pokemonById(req.params.id);
    res.json(pokeList);
  } catch (e) {
    if(e.response && e.response.status === 404){
      res.status(404).json({ error: "Pokemon not found" });
    }else{
      res.status(500).json({ error: e });
    }
  }
});
//Request Method

module.exports = router;
