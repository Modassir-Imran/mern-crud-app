const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

// GET all records
router.get('/', recordController.getAllRecords);

// POST new record
router.post('/', recordController.createRecord);

// PUT update record
router.put('/:id', recordController.updateRecord);

// DELETE record
router.delete('/:id', recordController.deleteRecord);

module.exports = router;
