const Record = require('../models/Record');

exports.getAllRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    console.error('Error in getAllRecords:', error);
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
};

exports.createRecord = async (req, res) => {
  try {
    const existingRecord = await Record.findOne({ CliendId: req.body.CliendId });
    if (existingRecord) {
      return res.status(400).json({ 
        message: 'Validation Error', 
        error: 'Client ID already exists. Please use a different Client ID.' 
      });
    }

    const newRecord = new Record(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    console.error('Error in createRecord:', error);
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Validation Error', 
        error: 'Client ID already exists. Please use a different Client ID.' 
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', error: error.message });
    }
    res.status(500).json({ message: 'Error creating record', error: error.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    if (req.body.CliendId) {
      const existingRecord = await Record.findOne({ 
        CliendId: req.body.CliendId,
        _id: { $ne: req.params.id }
      });
      if (existingRecord) {
        return res.status(400).json({ 
          message: 'Validation Error', 
          error: 'Client ID already exists. Please use a different Client ID.' 
        });
      }
    }

    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error('Error in updateRecord:', error);
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Validation Error', 
        error: 'Client ID already exists. Please use a different Client ID.' 
      });
    }
    res.status(500).json({ message: 'Error updating record', error: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error in deleteRecord:', error);
    res.status(500).json({ message: 'Error deleting record', error: error.message });
  }
};
