const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const patientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
    min: 0,
  },

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },

  weight: {
    type: Number,
    
    min: 0,
  },

  location: {
    type: String,
    
    trim: true,
  },
},
{ timestamps: true }
);

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;