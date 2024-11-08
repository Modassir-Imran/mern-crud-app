const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  CliendId: {
    type: Number,
    required: [true, 'Client ID is required'],
    min: [1, 'Client ID must be at least 1'],
    max: [10000, 'Client ID cannot exceed 10000'],
    unique: true,
    validate: {
      validator: function(v) {
        return Number.isInteger(v) && v > 0 && v <= 10000;
      },
      message: 'Client ID must be a number between 1 and 10000'
    }
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxLength: [20, 'Name cannot be more than 20 characters'],
    validate: {
      validator: function(v) {
        return /^[A-Za-z\s]+$/.test(v);
      },
      message: 'Name can only contain alphabets and spaces'
    }
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    maxLength: [40, 'Address cannot be more than 40 characters']
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    maxLength: [120, 'Bio cannot be more than 120 characters']
  }
}, {
  timestamps: true
});

recordSchema.index({ CliendId: 1 }, { unique: true });

module.exports = mongoose.model('Record', recordSchema);
