const express = require("express");
const pokemon = express.Router();
const db = require("../config/database");

pokemon.post("/", (req, res, next) => {
  return res.status(200).send(req.body);
});

pokemon.get("/", async (req, res, next) => {
  const pkmn = await db.query("SELECT * FROM pokemon");
  return res.status(200).json({ code: 1, message: pkmn });
});

pokemon.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const id = req.params.id;
  if (id >= 1 && id <= 722) {
    const pkmn = await db.query(
      "SELECT * FROM pokemon WHERE pok_id" + id + ";"
    );
    return res.status(200).json({ code: 1, message: pkmn });
  }
  return res.status(400).send({ code: 404, message: "Pokemon no encontrado" });
  // if(id <= 0 || id >= 723){
  //     return res.status(404).send('Pokemon no encontrado');
  // }else{
  //     const sql = "SELECT * FROM pokemon WHERE pok_id = ?";
  //     await db.query(sql, [id], function(err, result){
  //         if(err) throw err;
  //         return res.status(200).json(result);
  //     });
  // }
  // if(err) throw res.status.send('Pokemon no encontrado');
  // return res.status(200).json(result);
  // });
  // console.log(id);
  // if(id.pok_id >= 1 && id.pok_id <= 722){
  //     return res.status(200).json(id);
  // }
  // if(id.pok_id >= 1 && id.pok_id <= 722){
  //     return res.status(200).json(id);
  // }
  // return res.status(404).json(id);
});

pokemon.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  const pkmn = await db.query(
    "SELECT * FROM pokemon WHERE pok_name='" + name + "';"
  );

  if (pkmn.length > 0) {
    return res.status(200).json({ code: 1, message: pkmn });
  }
  return res.status(400).send({ code: 404, message: "Pokemon no encontrado" });
  // sql = "SELECT * FROM pokemon WHERE pok_name = ?";
  // await db.query(sql, [name], function(err, result){
  //     if(err) throw err;

  //     if(pokemon.length > 0){
  //         return res.status(200).json(result);
  //     }else{
  //         res.status(404).send('Pokémon no encontrado');
  //     }
  // });

  // const pkmn = pokemon.filter((p) =>{
  //     return (p.name.toUpperCase() == name.toUpperCase()) && p;
  // });
});

module.exports = pokemon;
