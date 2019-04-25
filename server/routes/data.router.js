const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET list of states
router.get('/state', (req, res) => {
   const action =
      `SELECT * FROM "state" ORDER BY "state"."state_name";`;

   pool.query(action)
      .then((response) => {
         res.send(response.rows);
      }).catch(() => {
         res.sendStatus(500);
   });
});

// GET list of districts in a state
router.get('/district/:state', (req, res) => {
   const state = req.params.state;
   const action =
      `SELECT * FROM "LEA" WHERE "state_ref" = $1 ORDER BY "LEA"."LEA_name";`;

   pool.query(action, [state])
      .then((response) => {
         res.send(response.rows);
      }).catch(() => {
         res.sendStatus(500);
      });
});

// GET list of schools in a given district in a state
router.get('/school/:district', (req, res) => {
   const district = req.params.district;
   const action =
      `SELECT * FROM "school" WHERE "LEA_ref" = $1 ORDER BY "school"."school_name";`;

   pool.query(action, [district])
      .then((response) => {
         res.send(response.rows);
      }).catch(() => {
         res.sendStatus(500);
      });
});

router.get('/data', (req, res) => {
   const action =
      `SELECT "Category",
         SUM("American Indian or Alaska Native") AS "native_american",
         SUM("Asian") AS "asian",
         SUM("Hawaiian/ Pacific Islander") AS "pacific_islander",
         SUM("Hispanic") AS "hispanic",
         SUM("Black") AS "black",
         SUM("White") AS "white",
         SUM("Two or more races") AS "two_race"
         FROM "Discipline of Students without Disabilities"
         WHERE "school_id" = 466627000600 AND "Category" = 'Total enrollment'
         GROUP BY "Category";`;

   pool.query(action)
      .then((response) => {
         res.send(response.rows);
      }).catch(() => {
         res.sendStatus(500);
      });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;
