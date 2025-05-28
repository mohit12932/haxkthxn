import mongoose from 'mongoose';
const Schema=mongoose.Schema;

const doctorSchema = new mongoose.Schema({
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
  

  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
   age: {
    type: Number,
    required: true,
    min: 0,
  },

  workingClinic: {
    type: String,
    default: '',
    trim: true,
  },

  experience: {
    type: Number,
    default: 0,
    min: 0,
  },

  qualification: {
    type: String,
    default: '',
    trim: true,
  },

  specialization: {
    type: String,
    default: '',
    trim: true,
  },
},
{ timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
