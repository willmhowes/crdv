const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/state', (req, res) => {
   const action =
      `SELECT * FROM "state"`;

   pool.query(action)
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
