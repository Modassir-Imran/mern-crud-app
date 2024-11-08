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

// Check if Client ID exists
router.get('/check-client-id/:clientId', recordController.checkClientId);

module.exports = router;
