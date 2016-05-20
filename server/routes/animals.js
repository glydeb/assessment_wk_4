var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/assessment2';
var random = require('../random');

router.get('/', function (req, res) {

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT id, animal_name, population FROM animals',
      function (err, result) {
        done();
        if (err) {
          res.sendStatus(500);
          return;
        }

        console.log(result.rows);

        res.send(result.rows);

      }
    );
  });
});

router.post('/', function (req, res) {
  var newAnimal = req.body;
  var population = random(1, 100);
  console.log(newAnimal);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO animals (animal_name, population) ' +
                  'VALUES ($1, $2)',
                  [newAnimal.animalName, population],
      function (err, result) {
        done();
        if (err) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(201);

      }
    );
  });
});

module.exports = router;
