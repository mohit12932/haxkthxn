const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const patientHistorySchema = new mongoose.Schema({
  dateOfSession: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
   
    required: true,
  },
  prescription: {
    type: String,
    required: true,
  },
   lastVisited: {
    type: Date,
    default: null,
  }
});

module.exports = mongoose.model('PatientHistory', patientHistorySchema);
