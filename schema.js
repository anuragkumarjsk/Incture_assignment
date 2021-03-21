const mongoose = require('mongoose');
var LeaveSchema =  mongoose.Schema({
  name:String,
  leave_type:String,
  start:Date,
  end:Date, 
  days:Number,
  remaining_days:Number,
  remarks:String
})

module.exports = mongoose.model('LeaveModel',LeaveSchema)
