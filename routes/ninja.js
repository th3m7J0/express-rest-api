const express = require('express');
const router = express.Router();
const ninjaController = require('../controllers/ninja');


// get a list of ninjas from db
router.get('/ninjas',ninjaController.readNearestNinja);

// add new ninja to db
router.post('/ninjas',ninjaController.create);

// update ninja in the db
router.put('/ninjas/:id',ninjaController.update)

// delete a ninja from db
router.delete('/ninjas/:id',ninjaController.delete);

module.exports = router;