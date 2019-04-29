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

// GET list of datasets available to a given scope
router.get('/dataset/:scope/:scopeSelector', (req, res) => {
   let scope = req.params.scope;
   let scopeSelector = req.params.scopeSelector;

   let action =
      `SELECT DISTINCT TABLE_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE COLUMN_NAME = 'school_id';`;

   pool.query(action)
      .then(async (response) => {
         let datasetList = response.rows;
         let datasetListArray = [];
         for (let i = 0; i < datasetList.length; i++) {
            // console.log(datasetList[i].table_name);
            const table = datasetList[i].table_name;
            let action =
               `SELECT DISTINCT TABLE_NAME,
                  "${table}"."school_id",
                  "${table}"."Year"
               FROM INFORMATION_SCHEMA.COLUMNS
               CROSS JOIN "${table}"
	            WHERE TABLE_NAME = '${table}'
                  AND "school_id" = $1;`;

            await pool.query(action, [scopeSelector])
               .then((response) => {
                  datasetListArray.push(...response.rows);
               });
         }
         res.send(datasetListArray);
      }).catch(() => {
         res.sendStatus(500);
      });
});

// GET specific dataset per user request
router.get('/scope/:scope/:scopeSelector/:dataset/:year', async (req, res) => {
   let scope = req.params.scope;
   let scopeSelector = req.params.scopeSelector;
   let datasetName = req.params.dataset;
   let year = req.params.year;

   // Fetches a list of datasets
   let verifiedDataset = await pool.query(`
      SELECT DISTINCT TABLE_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE COLUMN_NAME = 'school_id';
   `);

   // Converts response into an array of dataset names
   verifiedDataset = verifiedDataset.rows.map(x => x.table_name);

   // If the datasetName provided by client is valid, then proceed
   if (verifiedDataset.includes(datasetName)) {
      if (scope === 'state') {
         // response = yield axios.get(`/api/data/scope/${currentScope}/${districtValue}`);
      } else if (scope === 'district') {
         // response = yield axios.get(`/api/data/scope/${currentScope}/${districtValue}`);
      } else if (scope === 'school') {
         action = `SELECT * FROM "${datasetName}"
         JOIN "school" ON "school"."NCES_school_id" = "school_id"
         WHERE "school_id" = $1 AND "Year" = $2
         ORDER BY "school"."school_name";`;
      }

      pool.query(action, [scopeSelector, year])
         .then((response) => {
            res.send(response.rows);
         }).catch((error) => {
            res.sendStatus(500);
            console.log(error);
         });
   }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;

