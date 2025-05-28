import mongoose from 'mongoose';
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

const History = mongoose.model('History',patientHistorySchema);
export default History ;
